import { Injectable } from '@nestjs/common';
import { ICompanyResolver } from 'src/common/guards/company-resolver/company-resolver.interface';
import { DispatcherRepository } from 'src/modules/dispatchers/dispatcher.repository';

@Injectable()
export class DispatcherResolver implements ICompanyResolver {
  constructor(private readonly dispatcherRepo: DispatcherRepository) {}

  async resolve(userId: string): Promise<string | null> {
    return await this.dispatcherRepo.getCompanyId(userId);
  }
}
