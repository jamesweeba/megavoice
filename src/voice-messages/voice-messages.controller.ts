import { Body, Controller,Get,UseGuards,Param, Req,BadRequestException} from '@nestjs/common';
import { VoiceMessagesService } from './voice-messages.service';
import {CreateVoiceMessageDto,FindOneMessageDto} from "./dto"
import { AuthGuard } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';
import { validate} from 'class-validator';
import { UtilService } from '../util/util.service';


@UseGuards(AuthGuard('jwt'))
@Controller('voice-messages')
export class VoiceMessagesController {
    constructor(private voiceMessagesService: VoiceMessagesService,private utilService: UtilService){}
    async createBulk(@Body() dto:CreateVoiceMessageDto){
        let data=await this.voiceMessagesService.createBulk(dto);
        return data
    }
   @Get("/")
    async findAll(){
        // let data=await this.voiceMessagesService.findAll(dto:any);
        // return data;
    }

@Get("/:id")
    async findOne(@Param() param,@Req() req){
           const dto = plainToInstance(FindOneMessageDto, {
              ...param,
              userId: req.user.userId,
            });
              const errors = await validate(dto,{
              forbidNonWhitelisted: true, 
              whitelist: true, 
            });
            if (errors.length > 0) {
              const messages = await this.utilService.extractMessages(errors);
              throw new BadRequestException(messages);
            }
        let data=await this.voiceMessagesService.findOne(dto);
        return data
    }

    async updateOne(){

    }

    async removeOne(){

    }

}
