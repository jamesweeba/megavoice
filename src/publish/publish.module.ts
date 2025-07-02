import { Module } from '@nestjs/common';
import { PublishService } from './publish.service';
import { VoiceMessagesQueueModule } from 'src/voice-messages-queue/voice-messages-queue.module';

@Module({
   imports:[VoiceMessagesQueueModule],
  providers: [PublishService],
  exports: [PublishService],
})
export class PublishModule {}
