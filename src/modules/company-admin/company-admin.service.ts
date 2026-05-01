import { Injectable } from '@nestjs/common';
import { CompanyAdminRepository } from 'src/modules/company-admin/company-admin.repository';

@Injectable()
export class CompanyAdminService {
  constructor(private readonly companyAdminRepo: CompanyAdminRepository) {}

  async getTechnicians() {}

  async getDispatchers() {}
}
