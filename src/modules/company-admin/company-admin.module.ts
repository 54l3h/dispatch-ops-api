import { Module } from '@nestjs/common';
import { CompanyAdminController } from 'src/modules/company-admin/company-admin.controller';
import { CompanyAdminRepository } from 'src/modules/company-admin/company-admin.repository';
import { CompanyAdminService } from 'src/modules/company-admin/company-admin.service';

@Module({
  providers: [CompanyAdminService, CompanyAdminRepository],
  controllers: [CompanyAdminController],
  exports: [CompanyAdminRepository],
  imports: [],
})
export class CompanyAdminModule {}
