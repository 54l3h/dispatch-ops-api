import { PrismaService } from 'src/common/database/prisma.service';
import { CreateServiceDto } from 'src/modules/services/dto/create-service.dto';

export class ServiceRepository {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.service.findMany();
  }

  findOne(id: string) {
    return this.prisma.service.findUnique({ where: { id } });
  }

  create(data: CreateServiceDto) {
    return this.prisma.service.create({ data });
  }
}
