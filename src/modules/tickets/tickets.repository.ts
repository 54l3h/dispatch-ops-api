import { PrismaService } from 'src/common/database/prisma.service';
import { Ticket } from '@prisma/client';
import { CreateTicketDto } from 'src/modules/tickets/dto/create-ticket.dto';

export class TicketRepository {
  constructor(private readonly prisma: PrismaService) {}

  async list(): Promise<Ticket[]> {
    // you should use pagination here
    return await this.prisma.ticket.findMany();
  }

  async findById(id: string): Promise<Ticket | null> {
    return await this.prisma.ticket.findFirst({ where: { id } });
  }

  // async createTicket(data: CreateTicketDto): Promise<Ticket | null> {
  //   return await this.prisma.ticket.create({ data });
  // }
}
