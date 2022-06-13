import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({
    summary: 'login de usuário através de token de auth'
  })
  Login (@Body() dto: LoginDto): Promise<LoginResponseDto>{
    return this.authService.login(dto);
  }


@Get()
@UseGuards(AuthGuard())
@ApiOperation({
  summary: 'Retorna o usuário auth no momento'
})
@ApiBearerAuth()
profile(){
  return{ message:'Autenticação bem sucedida'};
}

}
