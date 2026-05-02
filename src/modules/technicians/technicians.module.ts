import { Module } from '@nestjs/common';
import { TechniciansRepository } from 'src/modules/technicians/technician.repository';
import { TechniciansController } from 'src/modules/technicians/technicians.controller';
import { TechniciansService } from 'src/modules/technicians/technicians.service';

@Module({
  providers: [TechniciansService, TechniciansRepository],
  controllers: [TechniciansController],
})
export class TechniciansModule {}
