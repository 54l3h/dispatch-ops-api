import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';

@Injectable()
export class CompanyAdminRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getCompanyId(userId: string): Promise<string | null> {
    return this.prisma.dispatcherProfile
      .findUnique({
        where: { userId },
        select: {
          companyId: true,
        },
      })
      .then((data) => data?.companyId ?? null);
  }
}
