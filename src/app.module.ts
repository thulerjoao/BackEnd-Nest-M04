import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { GenreModule } from './genre/genre.module';

@Module({
  imports: [GameModule, GenreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
