import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateGenreDto {
  @IsString()
  @ApiProperty({
    description: 'Genre of the game',
    example: 'FPS',
  })
  genre: string;
}
