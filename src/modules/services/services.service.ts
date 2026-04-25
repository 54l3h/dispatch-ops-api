import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from 'src/modules/services/dto/create-service.dto';
import { ServiceRepository } from 'src/modules/services/service.repository';

@Injectable()
export class ServicesService {
  constructor(private readonly serviceRepo: ServiceRepository) {}

  list() {
    return this.serviceRepo.list();
  }

  findOne(id: string) {
    return this.serviceRepo.findOne(id);
  }

  create(dto: CreateServiceDto) {
    return this.serviceRepo.create(dto);
  }
}
