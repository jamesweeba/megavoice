import { Module } from '@nestjs/common';
import { VoiceCampaignsModule } from './voice-campaigns/voice-campaigns.module';
import { UtilModule } from './util/util.module';
import { VoiceMessagesModule } from './voice-messages/voice-messages.module';
import { PrismaModule } from './prisma/prisma.module';
import { PublishModule } from './publish/publish.module';
import { VoiceMessagesQueueModule } from './voice-messages-queue/voice-messages-queue.module';
import { VoiceModule } from './voice/voice.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import  configuration  from './config/app.config'
import { HealthController } from './health/health.controller';

@Module({
  imports: [VoiceCampaignsModule, UtilModule, VoiceMessagesModule, PrismaModule, PublishModule, VoiceMessagesQueueModule, VoiceModule, UserModule, AuthModule,
       ConfigModule.forRoot({
      isGlobal: true,             // No need to import in every module
      load: [configuration],      // Loads from your config file
    })
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}


