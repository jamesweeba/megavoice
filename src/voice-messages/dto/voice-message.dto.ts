import { IsArray, ArrayNotEmpty, IsString, IsPhoneNumber, IsOptional, IsEnum, IsInt, IsUrl, IsDateString, ValidateNested ,IsNotEmpty} from 'class-validator';
import { Type } from 'class-transformer';


export class CreateVoiceMessageDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsPhoneNumber(undefined, { each: true }) // Validates each item as a phone number
  phoneNumbers: number[];

  @IsString()
  campaignId: string;

  
  @IsString()
  audioFileUrl: string;

  @IsString()
  userId: string


}
export enum CustomMessageStatus {
  Pending = 'PENDING',
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  Running='RUNNING',
  Delivered = 'DELIVERED',
  NotDelivered = 'NOT_DELIVERED',
  Unknown = 'UNKNOWN',
}


export class FindMessagesDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @IsEnum(CustomMessageStatus, { message: 'Invalid status value' })
  status?: CustomMessageStatus

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @IsDateString()
  createdAt?: string

  @IsString()
  @IsOptional()
  title?: string

  page?: string;

  limit?: string;
}

export class FindOneMessageDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  userId: string
}

