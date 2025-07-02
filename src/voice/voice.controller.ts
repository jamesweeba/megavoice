import { Controller, Post, Req, Header,Query,Get,Res,Param} from '@nestjs/common';
import { VoiceService } from './voice.service';
import { Response } from 'express';
import * as path from 'path';
const { twiml: { VoiceResponse } } = require('twilio');


@Controller('voice')
export class VoiceController {
    constructor(private voiceService: VoiceService){}
    @Post("/")
    async create(@Query('filename') filename: string,@Res() res: Response) {
        console.log(filename);
        const audioUrl =filename;
        const response = new VoiceResponse();
        response.play(audioUrl);
        res.type('text/xml');
        res.send(response.toString());
    }

    @Post("/call-status")
    call_status(@Req() req,@Res() res){
        console.log(req.query.callSid,req.body);
    }


  }
