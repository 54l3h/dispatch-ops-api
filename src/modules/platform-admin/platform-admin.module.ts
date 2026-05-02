import { Module } from '@nestjs/common';
import { PlatformAdminController } from 'src/modules/platform-admin/platform-admin.controller';
import { PlatformAdminRepository } from 'src/modules/platform-admin/platform-admin.repository';
import { PlatformAdminService } from 'src/modules/platform-admin/platform-admin.service';

@Module({
  controllers: [PlatformAdminController],
  providers: [PlatformAdminService, PlatformAdminRepository],
})
export class PlatformAdminModule {}
