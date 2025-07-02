import { Controller, Post ,UseInterceptors, UploadedFile, Body,BadRequestException, UseGuards,Req, Get,Query, Param} from '@nestjs/common';
import { VoiceCampaignsService } from './voice-campaigns.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { VoiceCampaignDto, FindAllVoiceCampaignDto,FindOneVoiceCampaignDto } from './dto/voice-campaign.dto';
import { FindMessagesDto } from '../voice-messages/dto/voice-message.dto';

import { plainToInstance } from 'class-transformer';
import { validate} from 'class-validator';
import { UtilService } from '../util/util.service';
import { AuthGuard } from '@nestjs/passport';



@UseGuards(AuthGuard('jwt'))
@Controller('voice-campaigns')
export class VoiceCampaignsController {
constructor(private voiceCampaignsService: VoiceCampaignsService,private utilService: UtilService  ) {}
@Post('/')
@UseInterceptors(FileInterceptor('audio'))
   async create( @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
    @Req() req) {
    const dto = plainToInstance(VoiceCampaignDto, {
      ...body,
      userId: req.user.userId,
      audio: file,
    });
    const errors = await validate(dto,{
      forbidNonWhitelisted: true, 
      whitelist: true, 
    });
    if (errors.length > 0) {
      const messages = await this.utilService.extractMessages(errors);
      throw new BadRequestException(messages);
    }
        return await this.voiceCampaignsService.create(dto);
    }

    @Get('/' )
    async findAll(@Query() query,@Req() req) {
      const dto = plainToInstance(FindAllVoiceCampaignDto, {
      ...query,
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
  return await this.voiceCampaignsService.findAll(dto);
    }

@Get('/:id')
    async findOne(@Param() param,@Req() req) {
      const dto = plainToInstance(FindOneVoiceCampaignDto, {
      userId: req.user.userId,
      ...param
    });
      const errors = await validate(dto,{
      forbidNonWhitelisted: true, 
      whitelist: true, 
    });
    if (errors.length > 0) {
      const messages = await this.utilService.extractMessages(errors);
      throw new BadRequestException(messages);
    }
      return await this.voiceCampaignsService.findOne(dto);
    } 

    @Get('/:id/voice-messages')
    async findMessages(@Param() param,@Req() req,@Query() query) {
      const dto = plainToInstance(FindMessagesDto, {
      userId: req.user.userId,
      ...param,
      ...query
    });
      const errors = await validate(dto,{
      forbidNonWhitelisted: true, 
      whitelist: true, 
    });
    if (errors.length > 0) {
      const messages = await this.utilService.extractMessages(errors);
      throw new BadRequestException(messages);
    }
      return await this.voiceCampaignsService.findMessagesByCampaignId(dto);
    }

    

}
