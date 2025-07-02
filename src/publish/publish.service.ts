// // import { Injectable } from '@nestjs/common';
// import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
// import { on } from 'events';
// // import { PrismaClient } from 'generated/prisma';
// import { PrismaService } from 'src/prisma/prisma.service';

// @Injectable()
// export class PublishService  implements OnModuleInit, OnModuleDestroy{
//     constructor(private prisma: PrismaService) {
    
//     }

//     onModuleInit() {
//         this.prisma.$queryRawUnsafe('LISTEN voice_message_channel');
//       }

// async onModuleDestroy() {
//         await this.prisma.$queryRawUnsafe('UNLISTEN voice_message_channel');

//   }

// }

// src/notifications/postgres-listener.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Client } from 'pg';
import{VoiceMessagesQueueService} from '../voice-messages-queue/voice-messages-queue.service'

@Injectable()
export class PublishService implements OnModuleInit, OnModuleDestroy {
    constructor( private voiceMessageQueueService: VoiceMessagesQueueService) {}
    private client: Client
  async onModuleInit() {
    this.client = new Client({
      connectionString: process.env.DATABASE_URL,
    });
    await this.client.connect();
    await this.client.query('LISTEN voice_message_channel');
      this.client.on('notification', async (msg) => {
      const payload = JSON.parse(msg.payload);
      // this.voiceMessageQueueService.enqueueMessage(payload);
      console.log('📨 New Voice Message:', payload);
      // TODO: Publish to RabbitMQ, Kafka, etc.
    });

    console.log('🔔 Listening to voice_message_channel...');
  }

  async onModuleDestroy() {
    await this.client.end();
  }
}

