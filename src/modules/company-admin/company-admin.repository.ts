import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/common/database/prisma.service';
import { RegisterCompanyDto } from 'src/modules/auth/dto/register-company.dto';

@Injectable()
export class CompanyAdminRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getCompanyId(userId: string): Promise<string | null> {
    return this.prisma.companyAdminProfile
      .findUnique({
        where: { userId },
        select: {
          companyId: true,
        },
      })
      .then((data) => data?.companyId ?? null);
  }

  async registerCompany(dto: RegisterCompanyDto) {
    return this.prisma.$transaction(async (tx) => {
      // create the user record now
      // TODO: add created_by / added_by column to the company table (later)

      // you got the hashedPassword
      const user = await tx.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          role: Role.COMPANY_ADMIN,
          password: dto.password,
          tokenVersion: 1,
        },
      });

      const company = await tx.company.create({
        data: {
          name: dto.companyName,
          email: dto.companyEmail,
        },
      });

      const profile = await tx.companyAdminProfile.create({
        data: {
          userId: user.id,
          companyId: company.id,
        },
      });

      return { user, company, profile };
    });
  }
}
