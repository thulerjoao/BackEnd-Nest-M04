import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()

export class AppService {
  getAppStatus(): string {
    return 'Server is running! 🚀 \n Please, check http://localhost:3333/api for Swagger docs...';
  }
}
