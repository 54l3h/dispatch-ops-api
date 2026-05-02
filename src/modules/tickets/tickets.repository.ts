import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { CreateTicketDto } from 'src/modules/tickets/dto/create-ticket.dto';
import { UpdateTicketStatusDto } from 'src/modules/tickets/dto/update-status.dto';
import { AssignTicketDto } from 'src/modules/tickets/dto/assign-ticket.dto';
 
const ticketSelect = {
  id: true,
  title: true,
  body: true,
  priority: true,
  status: true,
  createdAt: true,
  resolvedAt: true,
  createdBy: {
    select: { id: true, name: true, email: true },
  },
  assignedTo: {
    select: { id: true, name: true, email: true },
  },
  lead: {
    select: { id: true, customerName: true, status: true },
  },
};
 
@Injectable()
export class TicketsRepository {
  constructor(private readonly prisma: PrismaService) {}
 
  create(dto: CreateTicketDto, companyId: string, createdById: string) {
    return this.prisma.ticket.create({
      data: {
        title: dto.title,
        body: dto.body,
        priority: dto.priority,
        leadId: dto.leadId,
        companyId,
        createdById,
        assignedToId: dto.assignedToId,
      },
      select: ticketSelect,
    });
  }
 
  list(companyId: string, cursor?: string, take = 20) {
    return this.prisma.ticket.findMany({
      where: { companyId },
      take,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: 'desc' },
      select: ticketSelect,
    });
  }
 
  findOne(id: string, companyId: string) {
    return this.prisma.ticket.findFirst({
      where: { id, companyId },
      select: ticketSelect,
    });
  }
 
  updateStatus(id: string, companyId: string, dto: UpdateTicketStatusDto) {
    return this.prisma.ticket.update({
      where: { id, companyId },
      data: {
        status: dto.status,
        resolvedAt:
          dto.status === 'RESOLVED' || dto.status === 'CLOSED'
            ? new Date()
            : null,
      },
      select: ticketSelect,
    });
  }
 
  assign(id: string, companyId: string, dto: AssignTicketDto) {
    return this.prisma.ticket.update({
      where: { id, companyId },
      data: { assignedToId: dto.assignedToId },
      select: ticketSelect,
    });
  }
}