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
import { ConfigModule } from '@nestjs/config';
import { TechniciansModule } from 'src/modules/technicians/technicians.module';
import { DispatchersModule } from 'src/modules/dispatchers/dispatchers.module';
import { PlatformAdminModule } from 'src/modules/platform-admin/platform-admin.module';
import { LeadsModule } from 'src/modules/leads/leads.module';
import { TicketsModule } from 'src/modules/tickets/tickets.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    GuardsModule,
    AuthModule,
    UsersModule,
    CompanyAdminModule,
    TechniciansModule,
    DispatchersModule,
    PlatformAdminModule,
    LeadsModule,
    TicketsModule,
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
