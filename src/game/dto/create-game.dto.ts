import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString, IsUrl } from 'class-validator';

export class CreateGameDto {
  @IsString()
  @ApiProperty({
    description: 'Name of the game',
    example: 'cs go',
  })
  title: string;

  @ApiProperty({
    description: 'Link da imagem do jogo',
    example: 'http://www.imagemdojogo.com.br',
  })
  @IsString()
  coverImageUrl: string;

  @IsString()
  @ApiProperty({
    description: 'Description of the game',
    example: 'Jogo de ação feito no ano 2015 ',
  })
  description: string;

  @ApiProperty({ description: 'ano do jogo', example: 1996 })
  @IsNumber()
  @IsPositive()
  year: number;

  @ApiProperty({ description: 'Score do jogo - 0 até 5 ', example: 5 })
  @IsNumber()
  @IsPositive()
  imdbScore: number;

  @IsUrl()
  @ApiProperty({
    description: 'Trailer do jogo',
    example: 'http://www.youtube.com.br/trailer',
  })
  trailerYoutubeUrl: string;

  @ApiProperty({
    description: 'Gameplay do jogo',
    example: 'http://www.youtube.com.br/gameplay',
  })
  gameplayYoutubeUrl: string;

  @IsString()
  @ApiProperty({
    description: 'Gênero do jogo',
    example: 'FPS',
  })
  genreName: string;
}
