import { Controller, Post } from '@nestjs/common';
import { Role } from '@prisma/client';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CompanyAdminService } from 'src/modules/company-admin/company-admin.service';

@Controller()
export class CompanyAdminController {
  constructor(private readonly companyAdminService: CompanyAdminService) {}

}
