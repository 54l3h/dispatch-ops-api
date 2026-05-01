import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HashModule } from 'src/common/hash/hash.module';
import { AuthController } from 'src/modules/auth/auth.controller';
import { AuthService } from 'src/modules/auth/auth.service';
import { RefreshTokensRepository } from 'src/modules/auth/refresh-tokens.repository';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  controllers: [AuthController],
  exports: [],
  imports: [
    JwtModule.register({
      global: true,
      secret: 'ssad',
      signOptions: { expiresIn: '1week' },
    }),
    HashModule,
    UsersModule,
  ],
  providers: [AuthService, RefreshTokensRepository],
})
export class AuthModule {}
