import { Module } from '@nestjs/common';
import { TicketsController } from 'src/modules/tickets/tickets.controller';
import { TicketsRepository } from 'src/modules/tickets/tickets.repository';
import { TicketsService } from 'src/modules/tickets/tickets.service';

@Module({
  controllers: [TicketsController],
  exports: [],
  imports: [],
  providers: [TicketsService, TicketsRepository],
})
export class TicketsModule {}
