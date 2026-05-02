import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/common/database/prisma.service';
import { CreateDispatcherDto } from 'src/modules/dispatchers/dto/create-dispatcher.dto';

@Injectable()
export class DispatcherRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getCompanyId(userId: string): Promise<string | null> {
    return await this.prisma.dispatcherProfile
      .findUnique({
        where: { userId },
        select: {
          companyId: true,
        },
      })
      .then((data) => data?.companyId ?? null);
  }

  create(dto: CreateDispatcherDto, companyId: string) {
    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: dto.email,
          password: dto.password,
          name: dto.name,
          phone: dto.phone,
          role: Role.DISPATCHER,
          tokenVersion: 1,
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          createdAt: true,
        },
      });

      const profile = await tx.dispatcherProfile.create({
        data: {
          userId: user.id,
          companyId,
        },
      });

      return { user, profile };
    });
  }

  list(companyId: string, cursor?: string, take = 20) {
    return this.prisma.dispatcherProfile.findMany({
      where: { companyId },
      take,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            isActive: true,
          },
        },
      },
    });
  }
}
