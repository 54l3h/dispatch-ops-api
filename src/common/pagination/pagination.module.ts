import { Module } from '@nestjs/common';
import { PaginationService } from 'src/common/pagination/pagination.service';

@Module({
  exports: [PaginationService],
  providers: [PaginationService],
})
export class PaginationModule {}
