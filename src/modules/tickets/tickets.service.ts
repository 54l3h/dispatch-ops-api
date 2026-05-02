import { Injectable, NotFoundException } from '@nestjs/common';
import { RequestUser } from 'src/common/types/RequestUser.type';
import { TicketsRepository } from 'src/modules/tickets/tickets.repository';
import { CreateTicketDto } from 'src/modules/tickets/dto/create-ticket.dto';
import { UpdateTicketStatusDto } from 'src/modules/tickets/dto/update-status.dto';
import { AssignTicketDto } from 'src/modules/tickets/dto/assign-ticket.dto';
 
@Injectable()
export class TicketsService {
  constructor(private readonly ticketsRepo: TicketsRepository) {}
 
  create(dto: CreateTicketDto, user: RequestUser) {
    return this.ticketsRepo.create(dto, user.companyId!, user.id);
  }
 
  list(cursor: string, limit: number, user: RequestUser) {
    return this.ticketsRepo.list(user.companyId!, cursor, limit ?? 20);
  }
 
  async findOne(id: string, user: RequestUser) {
    const ticket = await this.ticketsRepo.findOne(id, user.companyId!);
    if (!ticket) throw new NotFoundException('Ticket not found');
    return ticket;
  }
 
  updateStatus(id: string, dto: UpdateTicketStatusDto, user: RequestUser) {
    return this.ticketsRepo.updateStatus(id, user.companyId!, dto);
  }
 
  assign(id: string, dto: AssignTicketDto, user: RequestUser) {
    return this.ticketsRepo.assign(id, user.companyId!, dto);
  }
}