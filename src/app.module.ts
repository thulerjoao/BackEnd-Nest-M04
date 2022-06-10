import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { GenreModule } from './genre/genre.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [GameModule, GenreModule, PrismaModule, UserModule, ProfileModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
