import {
  IsString,
  IsNotEmpty,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  IsOptional,
  IsEnum,
  IsNumberString
} from 'class-validator';
import { Transform } from 'class-transformer'
import { ApiProperty,ApiPropertyOptional,ApiParam } from '@nestjs/swagger';

@ValidatorConstraint({ name: 'isValidAudioFile', async: false })
export class IsValidAudioFileConstraint implements ValidatorConstraintInterface {
  validate(file: Express.Multer.File, args: ValidationArguments) {
    if (!file) {
      return false; // File is required
    }
    const allowedMimeTypes = ['audio/mpeg', 'audio/wav'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    return allowedMimeTypes.includes(file.mimetype) && file.size <= maxSize;
  }

  defaultMessage(args: ValidationArguments) {
    const file = args.object['audio'] as Express.Multer.File;
    if (!file) {
      return 'Audio file is required';
    }
    if (!['audio/mpeg', 'audio/wav'].includes(file.mimetype)) {
      return 'Invalid file type. Only MP3 or WAV files are allowed';
    }
    return 'File size exceeds 5MB limit';
  }
}

@ValidatorConstraint({ name: 'isValidRecipientList', async: false })
export class IsValidRecipientListConstraint implements ValidatorConstraintInterface {
  validate(recipient: string[], args: ValidationArguments) {
    if (!recipient || recipient.length === 0) {
      return false; // Array must not be empty
    }
    return recipient.every(num => typeof num === 'number' && !isNaN(num));
  }

  defaultMessage(args: ValidationArguments) {
    return 'Recipient list must be a comma-separated list of valid numbers';
  }
}

export enum CustomCampaignStatus {
  Pending = 'PENDING',
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  Running = 'RUNNING'
}

export class VoiceCampaignDto {
  @ApiProperty({ example: "title", description: "title of the voice campaingn" })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',   // tells Swagger it's a file upload
    description: 'Audio file to upload',
  })
  @Validate(IsValidAudioFileConstraint, { message: 'Invalid audio file' })
  audio: Express.Multer.File;


  @ApiProperty({
    type: String,
    description: 'Comma-separated list of recipient phone numbers',
    example: '233551234567,233501234567,233441234567',
  })
  @IsNotEmpty({ message: 'Recipient list is required' })
  @Validate(ValidatorConstraint)
  @Transform(({ value }) => {
    // Handle string input
    if (typeof value === 'string') {
      return value
        .split(',')
        .map(num => parseFloat(num.trim()))
        .filter(num => !isNaN(num));
    }
    // Handle array input
    if (Array.isArray(value)) {
      return value
        .map(num => parseFloat(num))
        .filter(num => !isNaN(num));
    }
    // Return empty array for invalid inputs
    return [];
  })
  @Validate(IsValidRecipientListConstraint)
  recipient: number[];



  @IsNotEmpty()
  @IsString()
  userId: string;
}


export class FindAllVoiceCampaignDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiPropertyOptional({ example: "PENDING", description: "status value for filtering" })
  @IsOptional()
  @Transform(({ value }) => value?.toUpperCase())
  @IsEnum(CustomCampaignStatus, { message: 'Invalid status value' })
  status?: CustomCampaignStatus;

  @ApiPropertyOptional({ example: "title", description: "title value for filtering" })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: "2020-01-01", description: "date value for filtering" })
  @IsOptional()
  @IsString()
  createdAt?: string; // You can use Date if needed

  @ApiPropertyOptional({ example: "1", description: "page number value for filtering" })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiPropertyOptional({ example: "10", description: "limit number value for filtering" })
  @IsOptional()
  @IsNumberString()
  limit?: string;
}


export class FindOneVoiceCampaignDto {
  // @ApiProperty({example: 'a3f5b1d2-6f77-4f29-82b7-6a6b4f9d1234',description:"" })  
  @IsString()
  @IsNotEmpty()
  id: string;

  
  @IsString()
  @IsNotEmpty()
  userId: string;
}

