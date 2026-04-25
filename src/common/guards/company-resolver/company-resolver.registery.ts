import { Injectable } from '@nestjs/common';
import { Roles } from 'src/common/enums/roles.enum';
import { ICompanyResolver } from 'src/common/guards/company-resolver/company-resolver.interface';
import { CompanyAdminResolver } from 'src/common/guards/company-resolver/resolvers/company-admin.resolver';
import { DispatcherResolver } from 'src/common/guards/company-resolver/resolvers/dispatcher.resolver';
import { TechnicianResolver } from 'src/common/guards/company-resolver/resolvers/technician.resolver';

@Injectable()
export class CompanyResolverRegistery {
  private readonly resolvers: Map<Roles, ICompanyResolver>;

  constructor(
    private readonly companyAdminResolver: CompanyAdminResolver,
    private readonly dispatcherResolver: DispatcherResolver,
    private readonly technicianResolver: TechnicianResolver,
  ) {
    this.resolvers = new Map<Roles, ICompanyResolver>([
      [Roles.COMPANY_ADMIN, this.companyAdminResolver],
      [Roles.DISPATCHER, this.dispatcherResolver],
      [Roles.TECHNICIAN, this.technicianResolver],
    ]);
  }

  async resolve(role: Roles, userId: string): Promise<string | null> {
    const resolver = this.resolvers.get(role);
    if (!resolver) return Promise.resolve(null);
    return resolver.resolve(userId);
  }
}
