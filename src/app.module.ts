import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from 'src/modules/auth/auth.module';
import { PrismaModule } from 'src/common/database/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UsersModule } from 'src/modules/users/users.module';
import { GuardsModule } from 'src/common/guards/guards.module';
import { CompanyAdminModule } from 'src/modules/company-admin/company-admin.module';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Module({
  imports: [
    GuardsModule,
    AuthModule,
    UsersModule,
    CompanyAdminModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
