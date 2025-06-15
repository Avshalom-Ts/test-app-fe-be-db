import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string, databaseURL: string } {
    return { message: 'Hello API', databaseURL: process.env.DATABASE_URL || 'not set' };
  }
}
