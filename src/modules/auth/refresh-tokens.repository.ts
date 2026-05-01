import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';

@Injectable()
export class RefreshTokensRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, tokenHash: string, expiresAt: Date) {
    try {
      return await this.prisma.refreshToken.create({
        data: {
          userId,
          tokenHash,
          expiresAt,
        },
      });
    } catch (error) {
      console.error('Failed to create refresh token:', error);
      throw new InternalServerErrorException('Could not save session');
    }
  }
}
