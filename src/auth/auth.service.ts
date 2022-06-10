import { Injectable } from '@nestjs/common';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  async login(Dto: typeof LoginDto): Promise<LoginResponseDto> {
    return{
      token: "teste",
      user: undefined
    };
  }
}
