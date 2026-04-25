import { Controller, Get, Param, Post } from '@nestjs/common';
import { CreateServiceDto } from 'src/modules/services/dto/create-service.dto';
import { ServicesService } from 'src/modules/services/services.service';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  // Public endpoint
  @Get()
  list() {
    return this.servicesService.list();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }

  @Post()
  createService(dto: CreateServiceDto) {
    return this.servicesService.create(dto);
  }
}
