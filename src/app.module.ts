import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from 'src/modules/auth/auth.module';
import { PrismaModule } from 'src/common/database/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
