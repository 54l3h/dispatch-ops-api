import { Body, Controller, Post } from '@nestjs/common';
import { Role } from '@prisma/client';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import type { RequestUser } from 'src/common/types/RequestUser.type';
import { CreateTechnicianDto } from 'src/modules/technicians/dto/create-technician.dto';
import { TechniciansService } from 'src/modules/technicians/technicians.service';

@Controller('technicians')
export class TechnicianController {
  constructor(private readonly techniciansService: TechniciansService) {}

  @Post()
  @Roles(Role.COMPANY_ADMIN)
  create(@Body() dto: CreateTechnicianDto, @CurrentUser() user: RequestUser) {
    return this.techniciansService.create(dto, user);
  }
}
