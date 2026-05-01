import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { HashService } from 'src/common/hash/hash.service';
import { RequestUser } from 'src/common/types/RequestUser.type';
import { CreateTechnicianDto } from 'src/modules/technicians/dto/create-technician.dto';
import { TechniciansRepository } from 'src/modules/technicians/technician.repository';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

@Injectable()
export class TechniciansService {
  constructor(
    private readonly techniciansRepo: TechniciansRepository,
    private readonly hashService: HashService,
  ) {}

  async create(dto: CreateTechnicianDto, user: RequestUser) {
    const { password, ...rest } = dto;
    const passwordHash = await this.hashService.hash(password);
    return this.techniciansRepo.create(
      { ...rest, password: passwordHash },
      user.companyId!,
    );
  }

  async list(cursor: string, limit: number, companyId: string) {
    return this.techniciansRepo.list(cursor, limit ?? 20, companyId);
  }
}
