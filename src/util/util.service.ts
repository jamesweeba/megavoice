import { Injectable } from '@nestjs/common';
import {ValidationError } from 'class-validator';
import { promises as fs } from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL =  process.env.SUPABASE_URL || 'https://vbcpnjlzpfcqqfdyilzs.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZiY3Buamx6cGZjcXFmZHlpbHpzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTcyNjIyMSwiZXhwIjoyMDY1MzAyMjIxfQ.uKzq9WBhTCy6eT7WQCs3lI8HxAJMirvSJxYGtcgm5zU'; // 🔒 Use only in server-side code
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);


@Injectable()
export class UtilService {
     extractMessages(errors: ValidationError[]): string[] {
  return errors.flatMap((error) => {
    if (error.constraints) {
      return Object.values(error.constraints);
    }
    if (error.children?.length) {
      return this. extractMessages(error.children);
    }
    return [];
  });
}

async createFileName(file: Express.Multer.File): Promise<string> {
const fileExtension = path.extname(file.originalname); // e.g., .mp3
  const uniqueName = `${uuidv4()}${fileExtension}`; // e.g., 32c9.mp3
  const uploadPath = path.join( '/tmp', uniqueName);
  // Ensure uploads directory exists
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


// async uploadAudio(file: Express.Multer.File): Promise<string> {
//     const bucket = 'voice';
//     const filePath = file.originalname; // Or generate a unique name

//     const { error, data } = await supabase.storage
//       .from(bucket)
//       .upload(filePath, file.buffer, {
//         contentType: file.mimetype,
//         upsert: true,
//       });

//     if (error) {
//       throw new Error(error.message);
//     }

//     return `${supabase.storageUrl}/object/public/${bucket}/${data.path}`;
//   }


  async uploadAudio(file: Express.Multer.File): Promise<string> {
   const bucket = 'voice';
   const filePath = `${uuidv4()}-${file.originalname}`;
   const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });
    if (error) {
      throw new Error(error.message);
    }
    const { data: publicUrlData } = supabase
      .storage
      .from(bucket)
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;




  }



  // utils/build-pagination.ts
 async  buildPagination(page = 1, limit = 10) {
  const take = Number(limit);
  const skip = (Number(page) - 1) * take;
  return { skip, take };
}

}
