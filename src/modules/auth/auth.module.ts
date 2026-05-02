import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HashModule } from 'src/common/hash/hash.module';
import { AuthController } from 'src/modules/auth/auth.controller';
import { AuthService } from 'src/modules/auth/auth.service';
import { RefreshTokensRepository } from 'src/modules/auth/refresh-tokens.repository';
import { UsersModule } from 'src/modules/users/users.module';
import { GuardsModule } from 'src/common/guards/guards.module';
import { CompanyAdminModule } from 'src/modules/company-admin/company-admin.module';

@Module({
  controllers: [AuthController],
  exports: [AuthService],
  imports: [
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
    }),
    HashModule,
    UsersModule,
    GuardsModule,
    CompanyAdminModule,
  ],
  providers: [AuthService, RefreshTokensRepository],
})
export class AuthModule {}
