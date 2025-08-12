import { Body, Controller, Post } from '@nestjs/common';
import { InfobipService } from './infobip.service';

@Controller('infobip')
export class InfobipController {
    constructor(private infobipService: InfobipService) { } 
    @Post('/voice-status')
   async handleVoiceCallStatus(@Body() body: any) {
        let response = await this.infobipService.handleVoiceCallStatus(body);
        return response;
        // Logic for handling voice calls
    }
}
