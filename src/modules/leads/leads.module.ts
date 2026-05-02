import { Module } from '@nestjs/common';
import { LeadsController } from 'src/modules/leads/leads.controller';
import { LeadsService } from 'src/modules/leads/leads.service';
import { LeadsRepository } from 'src/modules/leads/leads.repository';

@Module({
  controllers: [LeadsController],
  providers: [LeadsService, LeadsRepository],
  exports: [LeadsRepository],
})
export class LeadsModule {}