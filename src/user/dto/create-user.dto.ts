import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUrl, Matches, MinLength } from "class-validator";

export class CreateUserDto {

  @IsString()
  @ApiProperty({
    description: 'Nome de usuário',
    example: 'João',
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'email_usuario@gmail.com',
  })
  email: string;

  @IsString()
  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca',
  })
  @ApiProperty({
    description: 'Senha do usuário para login',
    example: 'Abcd@1234',
  })
  password: string;

  @ApiProperty({
    description: 'confirmação de senha',
    example: 'Abcd@1234'
  })
  confirmPassword: string;

  @IsUrl()
  @ApiProperty({
    description: 'Foto do usuário',
    example: 'https://cdn-icons-png.flaticon.com/512/17/17004.png',
  })
  photo: string;
}
