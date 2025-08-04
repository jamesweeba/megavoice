import { Injectable,NotFoundException } from '@nestjs/common';
import { VoiceCampaignDto,FindAllVoiceCampaignDto,FindOneVoiceCampaignDto } from './dto';
import { UtilService } from '../util/util.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { VoiceMessagesService } from 'src/voice-messages/voice-messages.service';
import { FindMessagesDto } from '../voice-messages/dto/voice-message.dto';

@Injectable()
export class VoiceCampaignsService {
    constructor(private utilService: UtilService,private prisma:PrismaService,private voiceMessagesService: VoiceMessagesService ) {}

   async  create(dto: VoiceCampaignDto) {
    let{audio,recipient:recipeint,title,userId}=dto

    // console.log(dto);
    console.log("ppppppppppppppppppppppppppppppppppppppppppppp")
    let audioFileUrl=  await this.utilService.uploadAudio(audio)
    //createFileName(audio);
    let data= await this.prisma.voiceCampaign.create({data:{audioFileUrl,recipeint,title,userId}});
    let bulkData={
      campaignId:data.id,
      phoneNumbers:recipeint,
      audioFileUrl,
      userId
     }
      this.voiceMessagesService.createBulk(bulkData)
      return data
      }
    
     async  findAll(dto:FindAllVoiceCampaignDto) {
          // const {userId,...rest } = dto; 
          const { userId, page = '1', limit = '10', ...rest } = dto;
          const where: any = {userId:userId};
      for (const [key, value] of Object.entries(dto)) {
      if (!value) continue;
      switch (key) {
        case 'status':
          where.status = { equals: value.toUpperCase()};
          break;
        case 'title':
          where.title = { contains: value, mode: 'insensitive' };
          break;
        case 'createdAt':
          if (!isNaN(Date.parse(value))) {
            where.createdAt = { gte: new Date(value) };
          }
          break;
        // Add more cases here if needed (e.g., userId, updatedAt, etc.)
        default:
          break;
      }
    }
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
  let { skip, take: pageSize1 } =await this.  utilService.buildPagination(pageNumber,pageSize);
    const [data, total] = await this.prisma.$transaction([
    this.prisma.voiceCampaign.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
    }),
    this.prisma.voiceCampaign.count({ where }),
  ]);
    if(data.length==0){
          throw new NotFoundException('No campaigns found');
    }
    return  {
    data,
    meta: {
      total,
      page: pageNumber,
      limit: pageSize1,
      totalPages: Math.ceil(total / pageSize),
    },
  };

  }  
  
     async findOne(dto: FindOneVoiceCampaignDto) {
        let data= await this.prisma.voiceCampaign.findUnique({where:{id:dto.id,userId:dto.userId}})
          if(!data){
          throw new NotFoundException('No campaigns found');
      }

        return data
      }
    
      update(id: number, updateVoiceCampaignDto) {
        return `This action updates a #${id} voiceCampaign`;
      }
    
      remove(id: number) {
        return `This action removes a #${id} voiceCampaign`;
      }

      async findMessagesByCampaignId(dto: FindMessagesDto) {
        const messages = await this.voiceMessagesService.findAll(dto);
        return messages;
      }
}
