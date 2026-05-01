import { Module } from '@nestjs/common';
import { UsersRepository } from 'src/modules/users/users.repository';

@Module({
  controllers: [],
  exports: [UsersRepository],
  imports: [],
  providers: [UsersRepository],
})
export class UsersModule {}
