import { Module } from '@nestjs/common';
import { VoiceMessagesQueueService } from './voice-messages-queue.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'voice-message',
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    })
  ],
  providers: [VoiceMessagesQueueService],
  exports: [VoiceMessagesQueueService],
})
export class VoiceMessagesQueueModule {}


