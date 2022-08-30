import { ApiProperty } from "@nestjs/swagger"
import { User } from "src/user/entities/user.entity"

export class LoginResponseDto{
  @ApiProperty({
    description:'JWT gerado pelo login',
    example:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsX3VzdWFyaW9AZ21haWwuY29tIiwiaWF0IjoxNjU1MTQ3MjQwLCJleHAiOjE2NTUzMjAwNDB9.fcumn8LqlaIIlmr-mxZY885C5oUN8OqM2P9LJ1pbfGU'
})
@ApiProperty({
  description:'Dados de usuário autenticado',
})
  token:string

  user: User
}
