import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import type { RequestUser } from 'src/common/types/RequestUser.type';
import { CreateDispatcherDto } from 'src/modules/dispatchers/dto/create-dispatcher.dto';
import { DispatchersService } from 'src/modules/dispatchers/dispatchers.service';
 
@Controller('dispatchers')
export class DispatchersController {
  constructor(private readonly dispatchersService: DispatchersService) {}
 
  @Post()
  @Roles(Role.COMPANY_ADMIN)
  create(
    @Body() dto: CreateDispatcherDto,
    @CurrentUser() user: RequestUser,
  ) {
    return this.dispatchersService.create(dto, user);
  }
 
  @Get()
  @Roles(Role.COMPANY_ADMIN)
  list(
    @Query('cursor', new ParseUUIDPipe({ optional: true })) cursor: string,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number,
    @CurrentUser() user: RequestUser,
  ) {
    return this.dispatchersService.list(cursor, limit, user);
  }
}
