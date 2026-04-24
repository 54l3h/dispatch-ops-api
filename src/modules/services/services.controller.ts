import { Controller, Get, Param } from '@nestjs/common';
import { ServicesService } from 'src/modules/services/services.service';

@Controller()
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  // Public endpoint
  @Get()
  list() {
    return this.servicesService.list();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {

    return this.servicesService.findOne(id)

  }
}
