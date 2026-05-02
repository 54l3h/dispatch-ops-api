import { Injectable, NotFoundException } from '@nestjs/common';
import { RequestUser } from 'src/common/types/RequestUser.type';
import { LeadsRepository } from 'src/modules/leads/leads.repository';
import { CreateLeadDto } from 'src/modules/leads/dto/create-lead.dto';
import { AssignLeadDto } from 'src/modules/leads/dto/assign-lead.dto';
import { UpdateLeadStatusDto } from 'src/modules/leads/dto/update-status.dto';
import { ListLeadsDto } from 'src/modules/leads/dto/list-leads.dto';

@Injectable()
export class LeadsService {
  constructor(private readonly leadsRepo: LeadsRepository) {}

  create(dto: CreateLeadDto, user: RequestUser) {
    return this.leadsRepo.create(dto, user.companyId!, user.id);
  }

  list(filters: ListLeadsDto, cursor: string, limit: number, user: RequestUser) {
    return this.leadsRepo.list(user.companyId!, filters, cursor, limit ?? 20);
  }

  async findOne(id: string, user: RequestUser) {
    const lead = await this.leadsRepo.findOne(id, user.companyId!);
    if (!lead) throw new NotFoundException('Lead not found');
    return lead;
  }

  async assign(id: string, dto: AssignLeadDto, user: RequestUser) {
    const lead = await this.leadsRepo.findOne(id, user.companyId!);
    if (!lead) throw new NotFoundException('Lead not found');
    return this.leadsRepo.assign(id, user.companyId!, dto);
  }

  async updateStatus(id: string, dto: UpdateLeadStatusDto, user: RequestUser) {
    const lead = await this.leadsRepo.findOne(id, user.companyId!);
    if (!lead) throw new NotFoundException('Lead not found');
    return this.leadsRepo.updateStatus(id, user.companyId!, dto);
  }
}