import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTicketDto } from 'src/modules/tickets/dto/create-ticket.dto';
import { TicketsService } from 'src/modules/tickets/tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  list() {
    return this.ticketsService.list();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(id);
  }

  @Post(':id')
  createTicket(@Body() dto: CreateTicketDto) {
    return this.ticketsService.createTicket(dto);
  }
}
