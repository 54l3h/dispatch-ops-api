import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    return this.prisma.user.create({ data });
  }

  // Changed id type to string for UUID support
  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        role: true,
        tokenVersion: true,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  /**
   * Generic update method
   * Uses Prisma.UserUpdateInput to allow partial updates (like password, name, or tokens)
   */
  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  /**
   * Specifically for the "Global Logout" / Invalidate tokens feature
   */
  async incrementTokenVersion(id: string): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: {
        tokenVersion: {
          increment: 1,
        },
        hashedRefreshToken: null, // clear current session too
      },
    });
  }
}
