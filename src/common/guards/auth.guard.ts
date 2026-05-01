import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/modules/users/users.repository';
import { FastifyRequest } from 'fastify';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';
import { Reflector } from '@nestjs/core';
export { Role as Roles } from '@prisma/client';
import { CompanyResolverRegistery } from 'src/common/guards/company-resolver/company-resolver.registery';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepo: UsersRepository,
    private readonly reflector: Reflector,
    private readonly companyResolverRegistery: CompanyResolverRegistery,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('No authorization header found');
    }

    const [type, token] = authHeader?.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid token format');
    }

    try {
      const { sub: userId, version } = await this.jwtService.verifyAsync(token);
      const user = await this.usersRepo.findById(userId);

      if (!user || user.tokenVersion !== version) {
        throw new UnauthorizedException('User not found or session expired');
      }

      const baseReqPayload = {
        id: user.id,
        role: user.role,
        email: user.email,
      };

      const companyId = await this.companyResolverRegistery.resolve(
        user.role!,
        userId,
      );

      if (companyId) baseReqPayload['companyId'] = companyId;

      request['user'] = baseReqPayload;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Unauthorized access');
    }
  }
}
