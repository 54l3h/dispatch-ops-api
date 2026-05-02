import { Injectable } from '@nestjs/common';
import { HashService } from 'src/common/hash/hash.service';
import { RequestUser } from 'src/common/types/RequestUser.type';
import { CreateDispatcherDto } from 'src/modules/dispatchers/dto/create-dispatcher.dto';
import { DispatcherRepository } from 'src/modules/dispatchers/dispatcher.repository';

@Injectable()
export class DispatchersService {
  constructor(
    private readonly dispatcherRepo: DispatcherRepository,
    private readonly hashService: HashService,
  ) {}

  async create(dto: CreateDispatcherDto, user: RequestUser) {
    const { password, ...rest } = dto;
    const hashedPassword = await this.hashService.hash(password);
    return this.dispatcherRepo.create(
      { ...rest, password: hashedPassword },
      user.companyId!,
    );
  }

  list(cursor: string, limit: number, user: RequestUser) {
    return this.dispatcherRepo.list(user.companyId!, cursor, limit ?? 20);
  }
}
