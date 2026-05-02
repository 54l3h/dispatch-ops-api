import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AssignPlanDto } from 'src/modules/platform-admin/dto/assign-plan.dto';
import { CreatePlanDto } from 'src/modules/platform-admin/dto/create-plan.dto';
import { PlatformAdminService } from 'src/modules/platform-admin/platform-admin.service';

@Controller('platform-admin')
@Roles(Role.PLATFORM_ADMIN)
export class PlatformAdminController {
  constructor(private readonly platformAdminService: PlatformAdminService) {}

  @Post('plans')
  createPlan(@Body() dto: CreatePlanDto) {
    return this.platformAdminService.createPlan(dto);
  }

  @Get('plans')
  listPlans() {
    return this.platformAdminService.listPlans();
  }

  @Delete('plans/:id')
  deletePlan(@Param('id', ParseUUIDPipe) id: string) {
    return this.platformAdminService.deletePlan(id);
  }

  @Post('subscriptions/assign')
  assignPlan(@Body() dto: AssignPlanDto) {
    return this.platformAdminService.assignPlan(dto);
  }

  @Get('companies')
  listCompanies(
    @Query('cursor', new ParseUUIDPipe({ optional: true })) cursor: string,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number,
  ) {
    return this.platformAdminService.listCompanies(cursor, limit ?? 20);
  }
}
