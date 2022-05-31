import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateGenreDto {
  @IsString()
  @ApiProperty({
    description: 'Genero do jogo',
    example: 'FPS',
  })
  name: string;
}
