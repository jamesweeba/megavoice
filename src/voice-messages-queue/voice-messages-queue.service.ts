import { Injectable } from '@nestjs/common';
// import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class VoiceMessagesQueueService {
  constructor(@InjectQueue('voice-message') private queue: Queue) { }

  async enqueueMessage(data: any) {
    console.log('Enqueuing message:', data);
    await this.queue.add('process', data); // `process` is the job name
  }

}
