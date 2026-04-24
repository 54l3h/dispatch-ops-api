import { CreateTicketDto } from 'src/modules/tickets/dto/create-ticket.dto';
import { TicketRepository } from 'src/modules/tickets/tickets.repository';

export class TicketsService {
  constructor(private readonly ticketRepository: TicketRepository) {}

  list() {
    return this.ticketRepository.list();
  }

  findOne(id: string) {
    return this.ticketRepository.findById(id);
  }

  createTicket(dto: CreateTicketDto) {
    // get the dispatcherId from the guard
    //

    return this.ticketRepository.createTicket(dto);
  }
}
