import { Module } from '@nestjs/common';
import { VoiceMessagesService } from './voice-messages.service';
import { VoiceMessagesController } from './voice-messages.controller';

@Module({
  providers: [VoiceMessagesService],
  controllers: [VoiceMessagesController],
  exports:[VoiceMessagesService]
})
export class VoiceMessagesModule {}
