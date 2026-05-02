import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { CreateLeadDto } from 'src/modules/leads/dto/create-lead.dto';
import { AssignLeadDto } from 'src/modules/leads/dto/assign-lead.dto';
import { UpdateLeadStatusDto } from 'src/modules/leads/dto/update-status.dto';
import { ListLeadsDto } from 'src/modules/leads/dto/list-leads.dto';

const leadSelect = {
  id: true,
  customerName: true,
  customerPhone: true,
  customerEmail: true,
  status: true,
  zone: true,
  address: true,
  estimatedValue: true,
  actualValue: true,
  source: true,
  notes: true,
  createdAt: true,
  service: {
    select: { id: true, name: true },
  },
  dispatcher: {
    select: { id: true, name: true, email: true },
  },
  technicianProfile: {
    select: {
      id: true,
      zone: true,
      status: true,
      user: { select: { id: true, name: true, phone: true } },
    },
  },
  customerProfile: {
    select: {
      id: true,
      status: true,
      user: { select: { id: true, name: true, phone: true, email: true } },
    },
  },
};

@Injectable()
export class LeadsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateLeadDto, companyId: string, dispatcherId: string) {
    return this.prisma.lead.create({
      data: {
        customerName: dto.customerName,
        customerPhone: dto.customerPhone,
        customerEmail: dto.customerEmail,
        zone: dto.zone,
        address: dto.address,
        serviceId: dto.serviceId,
        source: dto.source,
        estimatedValue: dto.estimatedValue,
        notes: dto.notes,
        customerProfileId: dto.customerProfileId,
        companyId,
        dispatcherId,
      },
      select: leadSelect,
    });
  }

  list(
    companyId: string,
    filters: ListLeadsDto,
    cursor?: string,
    take = 20,
  ) {
    return this.prisma.lead.findMany({
      where: {
        companyId,
        ...(filters.status && { status: filters.status }),
        ...(filters.zone && { zone: filters.zone }),
      },
      take,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: 'desc' },
      select: leadSelect,
    });
  }

  findOne(id: string, companyId: string) {
    return this.prisma.lead.findFirst({
      where: { id, companyId },
      select: leadSelect,
    });
  }

  assign(id: string, companyId: string, dto: AssignLeadDto) {
    return this.prisma.lead.update({
      where: { id, companyId },
      data: {
        technicianProfileId: dto.technicianProfileId,
        status: 'ASSIGNED',
      },
      select: leadSelect,
    });
  }

  updateStatus(id: string, companyId: string, dto: UpdateLeadStatusDto) {
    return this.prisma.lead.update({
      where: { id, companyId },
      data: { status: dto.status },
      select: leadSelect,
    });
  }
}