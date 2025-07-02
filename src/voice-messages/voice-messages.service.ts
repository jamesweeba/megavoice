import { Injectable,NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {CreateVoiceMessageDto,FindMessagesDto,FindOneMessageDto} from  './dto'
import { UtilService } from '../util/util.service';
// import{chunkArray} from "../util/util.service"

@Injectable()
export class VoiceMessagesService {

    constructor( private prismaservice: PrismaService ,private utilService: UtilService ) {}

  async createBulk(dto: CreateVoiceMessageDto) {
  const { campaignId, phoneNumbers, audioFileUrl,userId } = dto;
  const CHUNK_SIZE = 1000; // Adjust depending on DB memory/limits
  const messagesToInsert = phoneNumbers.map((phoneNumber) => ({
    phoneNumber: phoneNumber.toString(),
    campaignId,
    audioFileUrl,
    userId
  }));
  // this.prismaservice.$queryRawUnsafe('LISTEN voice_message_channel');

  const chunks = this .utilService.chunkArray(messagesToInsert, CHUNK_SIZE);
  const results = [];
  for (const chunk of chunks) {
    const result = await this.prismaservice.voiceMessage.createMany({
      data: chunk,
      skipDuplicates: true,
    });
  }

}

     async findAll(dto: FindMessagesDto) {
      const { userId, page = '1', limit = '10',id, ...rest } = dto;
      const where: any = {userId:userId,campaignId:id};
      for (const [key, value] of Object.entries(dto)) {
      if (!value) continue;
      switch (key) {
        case 'status':
          where.status = { equals: value.toUpperCase()};
          break;
        case 'phoneNumber':
          where.phoneNumber = { contains: value};
          break;
        case 'title':
          where.title = { contains: value, mode: 'insensitive' };
        case 'createdAt':
          if (!isNaN(Date.parse(value))) {
            where.createdAt = { gte: new Date(value) };
          }
          break;
        default:
          break;
      }
    }
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
  let { skip, take: pageSize1 } =await this.  utilService.buildPagination(pageNumber,pageSize);
    const [data, total] = await this.prismaservice.$transaction([
    this.prismaservice.voiceMessage.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
    }),
    this.prismaservice.voiceMessage.count({ where }),
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
    
    async   findOne(dto:FindOneMessageDto) {
        let{id}=dto
        let data= await this.prismaservice.voiceMessage.findUnique({where:{id}});
        return data;


        // return `This action returns a #${id} voiceCampaign`;
      }
    
      update(id: number, updateVoiceCampaignDto) {
        return `This action updates a #${id} voiceCampaign`;
      }
    
      remove(id: number) {
        return `This action removes a #${id} voiceCampaign`;
      }
}
