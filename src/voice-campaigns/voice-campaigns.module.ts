import { Module } from '@nestjs/common';
import { VoiceCampaignsService } from './voice-campaigns.service';
import { VoiceCampaignsController } from './voice-campaigns.controller';
import { UtilModule } from '../util/util.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { VoiceMessagesModule } from 'src/voice-messages/voice-messages.module';

@Module({
    imports: [UtilModule,PrismaModule,VoiceMessagesModule],
  providers: [VoiceCampaignsService],
  controllers: [VoiceCampaignsController]
})
export class VoiceCampaignsModule {}
