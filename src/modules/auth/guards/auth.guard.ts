import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/modules/users/users.repository';
import { FastifyRequest } from 'fastify';
import { IS_PUBLIC_KEY } from 'src/modules/auth/decorators/public.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepo: UserRepository,
    private readonly reflector: Reflector,
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
      const user = await this.userRepo.findById(userId);

      if (!user || user.tokenVersion !== version) {
        throw new UnauthorizedException('User not found or session expired');
      }

      request['user'] = {
        id: user.id,
        role: user.role,
        email: user.email,
      };

      return true;
    } catch (error) {
      throw new UnauthorizedException('Unauthorized access');
    }
  }
}
