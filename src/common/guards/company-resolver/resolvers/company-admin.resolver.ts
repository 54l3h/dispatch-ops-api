import { Injectable } from '@nestjs/common';
import { ICompanyResolver } from 'src/common/guards/company-resolver/company-resolver.interface';
import { CompanyAdminRepository } from 'src/modules/company-admin/company-admin.repository';

@Injectable()
export class CompanyAdminResolver implements ICompanyResolver {
  constructor(private readonly companyAdminRepo: CompanyAdminRepository) {}

  async resolve(userId: string): Promise<string | null> {
    return await this.companyAdminRepo.getCompanyId(userId);
  }
}
