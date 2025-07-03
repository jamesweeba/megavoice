import { Injectable } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { promises as fs } from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UtilService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    this.supabase = createClient(
      this.configService.get<string>('SUPABASE_URL'),
      this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY'),
    );
  }

  extractMessages(errors: ValidationError[]): string[] {
    return errors.flatMap((error) => {
      if (error.constraints) {
        return Object.values(error.constraints);
      }
      if (error.children?.length) {
        return this.extractMessages(error.children);
      }
      return [];
    });
  }

  async createFileName(file: Express.Multer.File): Promise<string> {
    const fileExtension = path.extname(file.originalname);
    const uniqueName = `${uuidv4()}${fileExtension}`;
    const uploadPath = path.join('/tmp', uniqueName);

    await fs.mkdir(path.dirname(uploadPath), { recursive: true });
    await fs.writeFile(uploadPath, file.buffer);

    return uniqueName;
  }

  chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  async uploadAudio(file: Express.Multer.File): Promise<string> {
    const bucket = 'voice';
    const filePath = `${uuidv4()}-${file.originalname}`;

    const { error } = await this.supabase.storage
      .from(bucket)
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) {
      throw new Error(error.message);
    }

    const { data: publicUrlData } = this.supabase
      .storage
      .from(bucket)
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  }

  async buildPagination(page = 1, limit = 10) {
    const take = Number(limit);
    const skip = (Number(page) - 1) * take;
    return { skip, take };
  }
}
