import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';

@Injectable()
export class FileService {
  async upload(file: Express.Multer.File, path: string) {
    await writeFile(path, file.buffer);

    return { success: true };
  }
}
