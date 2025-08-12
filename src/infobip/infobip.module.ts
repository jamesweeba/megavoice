import { Module } from '@nestjs/common';
import { InfobipService } from './infobip.service';
import { InfobipController } from './infobip.controller';

@Module({
  providers: [InfobipService],
  controllers: [InfobipController]
})
export class InfobipModule {}
