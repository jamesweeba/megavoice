import { Module } from '@nestjs/common';
import { VoiceMessagesQueueService } from './voice-messages-queue.service';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule, // 👈 required so ConfigService works in this module
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host:configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT') || 6379,
          password: configService.get<string>('REDIS_PASSWORD') || undefined, // Use undefined if no password is set
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
