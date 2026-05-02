import { Injectable, NotFoundException } from '@nestjs/common';
import { AssignPlanDto } from 'src/modules/platform-admin/dto/assign-plan.dto';
import { CreatePlanDto } from 'src/modules/platform-admin/dto/create-plan.dto';
import { PlatformAdminRepository } from 'src/modules/platform-admin/platform-admin.repository';

@Injectable()
export class PlatformAdminService {
  constructor(private readonly platformAdminRepo: PlatformAdminRepository) {}

  createPlan(dto: CreatePlanDto) {
    return this.platformAdminRepo.createPlan(dto);
  }

  listPlans() {
    return this.platformAdminRepo.listPlans();
  }

  async deletePlan(id: string) {
    const plan = await this.platformAdminRepo.findPlan(id);
    if (!plan) throw new NotFoundException('Plan not found');
    return this.platformAdminRepo.deletePlan(id);
  }

  async assignPlan(dto: AssignPlanDto) {
    const plan = await this.platformAdminRepo.findPlan(dto.planId);
    if (!plan) throw new NotFoundException('Plan not found');
    return this.platformAdminRepo.assignPlan(dto.companyId, dto.planId);
  }

  listCompanies(cursor?: string, take = 20) {
    return this.platformAdminRepo.listCompanies(cursor, take);
  }
}
