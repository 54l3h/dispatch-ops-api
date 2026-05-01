import { Injectable } from '@nestjs/common';
import { ICompanyResolver } from 'src/common/guards/company-resolver/company-resolver.interface';
import { TechniciansRepository } from 'src/modules/technicians/technician.repository';

@Injectable()
export class TechnicianResolver implements ICompanyResolver {
  constructor(private readonly technicianRepo: TechniciansRepository) {}

  async resolve(userId: string): Promise<string | null> {
    return await this.technicianRepo.getCompanyId(userId);
  }
}
