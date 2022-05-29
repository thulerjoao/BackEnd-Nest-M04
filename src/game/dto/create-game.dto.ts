import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateGameDto {
  @IsString()
  @ApiProperty({
    description: 'Name of the game',
    example: 'cs go',
  })
  name: string;

 @IsString()
  @ApiProperty({
    description: 'Image of the game',
    example: 'http://image.com',
  })
  image: string;

  @IsString()
  @ApiProperty({
    description: 'Description of the game',
    example: 'Jogo de ação feito no ano 2015 ',
  })
  description: string;

  @IsNumber()
  @ApiProperty({
    description: 'Faixa Etária infidicada',
    example: 16,
  })
  ageRating: number;

  @IsNumber()
  @ApiProperty({
    description: 'Pontuação do jogo',
    example: 5,
  })
  score: number;

  @IsNumber()
  @ApiProperty({
    description: 'Valor do jogo',
    example: 59.90,
  })
  price: number;
}

