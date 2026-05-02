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
import { LeadsService } from 'src/modules/leads/leads.service';
import { CreateLeadDto } from 'src/modules/leads/dto/create-lead.dto';
import { AssignLeadDto } from 'src/modules/leads/dto/assign-lead.dto';
import { UpdateLeadStatusDto } from 'src/modules/leads/dto/update-status.dto';
import { ListLeadsDto } from 'src/modules/leads/dto/list-leads.dto';

@Controller('leads')
@Roles(Role.COMPANY_ADMIN, Role.DISPATCHER)
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  create(@Body() dto: CreateLeadDto, @CurrentUser() user: RequestUser) {
    return this.leadsService.create(dto, user);
  }

  @Get()
  list(
    @Query() filters: ListLeadsDto,
    @Query('cursor', new ParseUUIDPipe({ optional: true })) cursor: string,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number,
    @CurrentUser() user: RequestUser,
  ) {
    return this.leadsService.list(filters, cursor, limit, user);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: RequestUser,
  ) {
    return this.leadsService.findOne(id, user);
  }

  @Patch(':id/assign')
  @Roles(Role.COMPANY_ADMIN, Role.DISPATCHER)
  assign(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: AssignLeadDto,
    @CurrentUser() user: RequestUser,
  ) {
    return this.leadsService.assign(id, dto, user);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateLeadStatusDto,
    @CurrentUser() user: RequestUser,
  ) {
    return this.leadsService.updateStatus(id, dto, user);
  }
}
