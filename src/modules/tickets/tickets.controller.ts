import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import type { RequestUser } from 'src/common/types/RequestUser.type';
import { TicketsService } from 'src/modules/tickets/tickets.service';
import { CreateTicketDto } from 'src/modules/tickets/dto/create-ticket.dto';
import { UpdateTicketStatusDto } from 'src/modules/tickets/dto/update-status.dto';
import { AssignTicketDto } from 'src/modules/tickets/dto/assign-ticket.dto';

@Controller('tickets')
@Roles(Role.COMPANY_ADMIN, Role.DISPATCHER)
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @Roles(Role.DISPATCHER)
  create(@Body() dto: CreateTicketDto, @CurrentUser() user: RequestUser) {
    return this.ticketsService.create(dto, user);
  }

  @Get()
  list(
    @Query('cursor', new ParseUUIDPipe({ optional: true })) cursor: string,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number,
    @CurrentUser() user: RequestUser,
  ) {
    return this.ticketsService.list(cursor, limit, user);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: RequestUser,
  ) {
    return this.ticketsService.findOne(id, user);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTicketStatusDto,
    @CurrentUser() user: RequestUser,
  ) {
    return this.ticketsService.updateStatus(id, dto, user);
  }

  @Patch(':id/assign')
  @Roles(Role.COMPANY_ADMIN)
  assign(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AssignTicketDto,
    @CurrentUser() user: RequestUser,
  ) {
    return this.ticketsService.assign(id, dto, user);
  }
}
