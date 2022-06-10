import { ApiProperty } from "@nestjs/swagger"
import { User } from "src/user/entities/user.entity"

export class LoginResponseDto{
  @ApiProperty({
    description:'JWT gerado pelo login',
    example:'TOKEN_GERADO_AUTOMATICAMENTE'
})
@ApiProperty({
  description:'Dados do usuário autenticado',
})
  token:string
  user: User
}
