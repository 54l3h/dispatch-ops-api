import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { CreatePlanDto } from 'src/modules/platform-admin/dto/create-plan.dto';

@Injectable()
export class PlatformAdminRepository {
  constructor(private readonly prisma: PrismaService) {}

  createPlan(dto: CreatePlanDto) {
    return this.prisma.subscriptionPlan.create({ data: dto });
  }

  listPlans() {
    return this.prisma.subscriptionPlan.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'asc' },
    });
  }

  findPlan(id: string) {
    return this.prisma.subscriptionPlan.findUnique({ where: { id } });
  }

  deletePlan(id: string) {
    return this.prisma.subscriptionPlan.update({
      where: { id },
      data: { isActive: false }, // soft delete
    });
  }

  assignPlan(companyId: string, planId: string) {
    const now = new Date();
    const periodEnd = new Date(now);
    periodEnd.setDate(periodEnd.getDate() + 14); // 14 day trial

    return this.prisma.subscription.upsert({
      where: { companyId },
      create: {
        companyId,
        planId,
        currentPeriodStart: now,
        currentPeriodEnd: periodEnd,
        trialEndsAt: periodEnd,
      },
      update: {
        planId,
        currentPeriodStart: now,
        currentPeriodEnd: periodEnd,
      },
    });
  }

  listCompanies(cursor?: string, take = 20) {
    return this.prisma.company.findMany({
      take,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        isActive: true,
        createdAt: true,
        subscription: {
          select: {
            status: true,
            currentPeriodEnd: true,
            plan: { select: { name: true } },
          },
        },
      },
    });
  }
}