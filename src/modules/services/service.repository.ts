import { PrismaService } from 'src/common/database/prisma.service';

export class ServiceRepository {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.service.findMany();
  }

  findOne(id: string) {
    return this.prisma.service.findUnique({ where: { id } });
  }
}
