import { Module } from '@nestjs/common';
import { VoiceMessagesQueueService } from './voice-messages-queue.service';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host:"44.198.162.244",
          port:6339,
          password:"H0r6C0rpA3w0RED1S", // Use undefined if no password is set
        },
      }),
      inject: [ConfigService],
    }),

    // Register your queue
    BullModule.registerQueue({
      name: 'voice-message',
    }),
  ],
  providers: [VoiceMessagesQueueService],
  exports: [VoiceMessagesQueueService],
})
export class VoiceMessagesQueueModule {}
