import { Module } from '@nestjs/common';
import { DispatchersController } from 'src/modules/dispatchers/dispatchers.controller';
import { DispatchersService } from 'src/modules/dispatchers/dispatchers.service';
import { DispatcherRepository } from 'src/modules/dispatchers/dispatcher.repository';
import { HashModule } from 'src/common/hash/hash.module';
 
@Module({
  imports: [HashModule],
  controllers: [DispatchersController],
  providers: [DispatchersService, DispatcherRepository],
  exports: [DispatcherRepository],
})
export class DispatchersModule {}
