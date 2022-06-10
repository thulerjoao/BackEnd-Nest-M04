import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class LoginDto{

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description:'E-mail do usuário',
    example:'email_usuario@gmail.com'
  })
    email:string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
      description:'Senha de usuário',
      example:'Abcd@1234'
    })
  password:string
}
