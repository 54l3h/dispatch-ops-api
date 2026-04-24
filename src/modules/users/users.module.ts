import { Module } from '@nestjs/common';
import { UserRepository } from 'src/modules/users/users.repository';

@Module({
  controllers: [],
  exports: [UserRepository],
  imports: [],
  providers: [UserRepository],
})
export class UsersModule {}
