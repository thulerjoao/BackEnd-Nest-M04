import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, Matches, MinLength } from 'class-validator';

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
    description: 'Confirmação da senha',
    example: 'Abcd@1234',
  })
  confirmPassword: string;

  @IsString()
  @ApiProperty({
    description: 'CPF do usuário',
    example: '15019718750',
  })
  cpf: string;

  @ApiProperty({
    description: 'Permissoes de usuário',
    example: false,
  })
  isAdmin: boolean;
}
