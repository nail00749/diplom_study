import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import * as path from 'path';
import * as fs from 'fs';
import * as pump from 'pump';

@Injectable()
export class FileService {
  createFile(file, filename: string, pathPrefix = ''): string {
    const fileExtension = filename.split('.').pop();
    const fileName = uuid.v4() + '.' + fileExtension;
    const filePath = path.resolve(__dirname, '../..', 'static', pathPrefix);
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }
    const fullPath = path.resolve(filePath, fileName);
    pump(file, fs.createWriteStream(fullPath));
    return '/' + pathPrefix + '/' + fileName;
  }
}
