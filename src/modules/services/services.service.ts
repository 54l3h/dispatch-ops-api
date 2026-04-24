import { Injectable } from '@nestjs/common';
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
}
