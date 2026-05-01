import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/common/database/prisma.service';
import { CreateTechnicianDto } from 'src/modules/technicians/dto/create-technician.dto';

@Injectable()
export class TechniciansRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getCompanyId(userId: string): Promise<string | null> {
    return this.prisma.technicianProfile
      .findUnique({
        where: { userId },
        select: {
          companyId: true,
        },
      })
      .then((result) => result?.companyId ?? null);
  }

  async create(dto: CreateTechnicianDto, companyId: string) {
    // WHEN YOU CREATE THE TECHNICIAN ACCOUNT YOU SHOULD
    // 2. CREATE A TECHNICIAN PROFILE

    return this.prisma.$transaction(async (tx) => {
      // 1. CREATE A USER ACCOUNT FOR THE TECHNICIAN
      const user = await tx.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          phone: dto.phone,
          password: dto.password,
          role: Role.TECHNICIAN,
          tokenVersion: 1,
          isActive: true,
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

      const profile = await tx.technicianProfile.create({
        data: {
          userId: user.id,
          companyId,
          extension: dto.extension,
          zone: dto.zone,
        },
      });

      return { user, profile };
    });
  }
}
