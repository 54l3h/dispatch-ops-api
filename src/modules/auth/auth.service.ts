import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role, User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { CompanyResolverRegistery } from 'src/common/guards/company-resolver/company-resolver.registery';
import { HashService } from 'src/common/hash/hash.service';
import { RequestUser } from 'src/common/types/RequestUser.type';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { RegisterCompanyDto } from 'src/modules/auth/dto/register-company.dto';
import { RegisterDto } from 'src/modules/auth/dto/register.dto';
import { RefreshTokensRepository } from 'src/modules/auth/refresh-tokens.repository';
import { AuthResponse } from 'src/modules/auth/responses/auth.response';
import { CompanyAdminRepository } from 'src/modules/company-admin/company-admin.repository';
// import { User } from 'src/modules/users/entities/user.entity';
import { UsersRepository } from 'src/modules/users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly refreshTokenRepository: RefreshTokensRepository,
    private readonly companyResolverRegistery: CompanyResolverRegistery,
    private readonly companyAdminRepository: CompanyAdminRepository,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Public: Log in an existing user
   */
  async login(dto: LoginDto): Promise<AuthResponse> {

    console.log({dto});
    
    const user = await this.usersRepository.findByEmail(dto.email);

    console.log({user});
    
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await this.hashService.compare(
      dto.password,
      user.password,
    );

    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    return this.getAuthenticatedResponse(user);
  }

  /**
   * Public: Register a new user
   */
  async register(dto: RegisterDto): Promise<AuthResponse> {
    try {
      const hashedPassword = await this.hashService.hash(dto.password);

      const user = await this.usersRepository.create({
        ...dto,
        password: hashedPassword,
        tokenVersion: 1, // start with version 1
      });

      return this.getAuthenticatedResponse(user);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Email already in use');
        }
      }

      console.log(error);
      throw new InternalServerErrorException('Registration failed');
    }
  }

  async registerCompany(dto: RegisterCompanyDto): Promise<AuthResponse> {
    try {
      // register company?
      // create the company record
      // create a user record for the company admin
      // create a company admin profile

      const hashedPassword = await this.hashService.hash(dto.password);
      const { user } = await this.companyAdminRepository.registerCompany({
        ...dto,
        password: hashedPassword,
      });

      return this.getAuthenticatedResponse(user);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Email already in use');
        }
      }

      console.log(error);
      throw new InternalServerErrorException('Registration failed');
    }
  }

  async getProfile(user: RequestUser) {
    return this.usersRepository.findById(user.id);
  }

  /**
   * Private: The "Orchestrator"
   * Combines token generation and database persistence.
   */
  private async getAuthenticatedResponse(user: User): Promise<AuthResponse> {
    // you should get the company id to inject it into the token
    const companyId = await this.companyResolverRegistery.resolve(
      user.role,
      user.id,
    );

    console.log({tokens:companyId});

    const tokens = await this.generateTokens(
      user.id,
      user.tokenVersion,
      user.role,
      companyId!,
    );
    const hashedRefreshToken = await this.hashService.hash(tokens.refreshToken);

    // Set expiration (7 days from now)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.refreshTokenRepository.create(
      user.id,
      hashedRefreshToken,
      expiresAt,
    );

    return tokens;
  }

  /**
   * Private: The "Token Factory"
   * Purely handles JWT payload and signing.
   */
  private async generateTokens(
    userId: string,
    tokenVersion: number,
    role: Role,
    companyId?: string,
  ): Promise<AuthResponse> {
    const payload = {
      sub: userId,
      version: tokenVersion,
      role,
      companyId,
    };
    console.log({ payload });

    const tokens = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.JWT_ACCESS_SECRET,
      }),

      this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.JWT_REFRESH_SECRET,
      }),
    ]).then(([accessToken, refreshToken]) => ({
      accessToken,
      refreshToken,
    }));

    return new AuthResponse(tokens);
  }
}
