import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { HashService } from 'src/common/hash/hash.service';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { RegisterDto } from 'src/modules/auth/dto/register.dto';
import { AuthResponse } from 'src/modules/auth/responses/auth.response';
import { User } from 'src/modules/users/entities/user.entity';
import { UserRepository } from 'src/modules/users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Public: Log in an existing user
   */
  async login(dto: LoginDto): Promise<AuthResponse> {
    const user = await this.userRepository.findByEmail(dto.email);
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

      const user = await this.userRepository.create({
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

  /**
   * Private: The "Orchestrator"
   * Combines token generation and database persistence.
   */
  private async getAuthenticatedResponse(user: User): Promise<AuthResponse> {
    const tokens = await this.generateTokens(user.id, user.tokenVersion);

    const hashedRefreshToken = await this.hashService.hash(tokens.refreshToken);
    await this.userRepository.update(user.id, {
      hashedRefreshToken,
    });

    return tokens;
  }

  /**
   * Private: The "Token Factory"
   * Purely handles JWT payload and signing.
   */
  private async generateTokens(
    userId: string,
    tokenVersion: number,
  ): Promise<AuthResponse> {
    const payload = {
      sub: userId,
      version: tokenVersion,
    };

    const tokens = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: '15m',
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
