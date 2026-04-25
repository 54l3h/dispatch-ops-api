import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';

@Injectable()
export class TechnicianRepository {
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
}
