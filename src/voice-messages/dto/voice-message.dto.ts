import { IsArray, ArrayNotEmpty, IsString, IsPhoneNumber, IsOptional, IsEnum, IsInt, IsUrl, IsDateString, ValidateNested ,IsNotEmpty} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


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


export class FindMessagesParamDto {
  @ApiProperty({ description: 'The ID of the voice campaign', example: 'cmetr7cic00022i7jneccjh57' })
  @IsString()
  @IsNotEmpty()
  id: string;
}


export class FindMessagesDto {
  // @ApiProperty({ description: 'The message ID', example: 'cmetr7cic00022i7jneccjh57' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiPropertyOptional({ description: 'Phone number filter', example: '233551234567' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  phoneNumber?: string;

  @ApiPropertyOptional({ enum: CustomMessageStatus, description: 'Message status' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @IsEnum(CustomMessageStatus, { message: 'Invalid status value' })
  status?: CustomMessageStatus

  @ApiPropertyOptional({ description: 'Created date (ISO string)', example: '2025-08-27T12:34:56Z' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @IsDateString()
  createdAt?: string

  @ApiPropertyOptional({ description: 'Message title', example: 'Welcome message' })
  @IsString()
  @IsOptional()
  title?: string

  @ApiPropertyOptional({ description: 'Page number', example: '1' })
  page?: string;

  @ApiPropertyOptional({ description: 'Page size', example: '10' })
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

