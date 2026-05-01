import { Module } from '@nestjs/common';
import { CompanyResolverRegistery } from 'src/common/guards/company-resolver/company-resolver.registery';
import { CompanyAdminResolver } from 'src/common/guards/company-resolver/resolvers/company-admin.resolver';
import { DispatcherResolver } from 'src/common/guards/company-resolver/resolvers/dispatcher.resolver';
import { TechnicianResolver } from 'src/common/guards/company-resolver/resolvers/technician.resolver';
import { CompanyAdminRepository } from 'src/modules/company-admin/company-admin.repository';
import { DispatcherRepository } from 'src/modules/dispatchers/dispatcher.repository';
import { TechniciansRepository } from 'src/modules/technicians/technician.repository';

@Module({
  providers: [
    CompanyAdminResolver,
    DispatcherResolver,
    TechnicianResolver,
    CompanyAdminRepository,
    DispatcherRepository,
    TechniciansRepository,
    CompanyResolverRegistery,
  ],
  exports: [CompanyResolverRegistery],
})
export class GuardsModule {}
