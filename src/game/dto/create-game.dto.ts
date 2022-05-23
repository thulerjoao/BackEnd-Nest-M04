import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateGameDto {
  @IsString()
  @ApiProperty({
    description: 'Name of the game',
    example: 'cs go',
  })
  name: string;
}
