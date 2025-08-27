import { Controller, Post, UseInterceptors, UploadedFile, Body, BadRequestException, UseGuards, Req, Get, Query, Param } from '@nestjs/common';
import { VoiceCampaignsService } from './voice-campaigns.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { VoiceCampaignDto, FindAllVoiceCampaignDto, FindOneVoiceCampaignDto } from './dto/voice-campaign.dto';
import { FindMessagesDto, FindMessagesParamDto } from '../voice-messages/dto/voice-message.dto';

import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { UtilService } from '../util/util.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBody, ApiConsumes, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';
// @ApiBearerAuth('jwt-auth') // 👈 link to the name in main.ts



@UseGuards(AuthGuard('jwt'))
@ApiTags('voice-campaigns')
@ApiBearerAuth('jwt')
@Controller('voice-campaigns')

export class VoiceCampaignsController {
  constructor(private voiceCampaignsService: VoiceCampaignsService, private utilService: UtilService) { }
  @Post('/')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: VoiceCampaignDto })
  @UseInterceptors(FileInterceptor('audio'))
  async create(@UploadedFile() file: Express.Multer.File,
    @Body() body: any,
    @Req() req) {
    const dto = plainToInstance(VoiceCampaignDto, {
      ...body,
      userId: req.user.userId,
      audio: file,
    });
    const errors = await validate(dto, {
      forbidNonWhitelisted: true,
      whitelist: true,
    });
    if (errors.length > 0) {
      const messages = await this.utilService.extractMessages(errors);
      throw new BadRequestException(messages);
    }
    return await this.voiceCampaignsService.create(dto);
  }

  @Get('/')
  @ApiQuery({ type: FindAllVoiceCampaignDto })
  async findAll(@Query() query, @Req() req) {
    const dto = plainToInstance(FindAllVoiceCampaignDto, {
      ...query,
      userId: req.user.userId,
    });
    const errors = await validate(dto, {
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
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The ID of the voice campaign',
    example: 'cmes8druq0001mv2bcudwk95e',
    //  ... FindOneVoiceCampaignDto
  })
  async findOne(@Param() param, @Req() req) {
    const dto = plainToInstance(FindOneVoiceCampaignDto, {
      userId: req.user.userId,
      ...param
    });
    const errors = await validate(dto, {
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
  @ApiQuery({ type: FindMessagesDto })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The ID of the voice campaign',
    example: 'cmes8druq0001mv2bcudwk95e',
    //  ... FindOneVoiceCampaignDto
  })
  async findMessages(@Param() param, @Req() req, @Query() query) {
    const dto = plainToInstance(FindMessagesDto, {
      userId: req.user.userId,
      ...param,
      ...query
    });
    const errors = await validate(dto, {
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
