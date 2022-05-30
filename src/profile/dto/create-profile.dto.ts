import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class CreateProfileDto {
  @IsString()
  @ApiProperty({
    description: 'Nome para o perfil',
    example: 'João Pedro',
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: 'Imagem para o perfil',
    example: 'https://cdn-icons-png.flaticon.com/512/17/17004.png',
  })
  photo: string;


  @IsString()
  @ApiProperty({
    description: 'Id de usuário',
    example: '64783-das4-312-da1d3dqd-d2d12',
  })
  userId: string;

  @ApiProperty({
    description: 'Id do jogo - opcional',
    example: '64783-das4-312-da1d3dqd-d2d12',
  })
  gameId?: string;
}
