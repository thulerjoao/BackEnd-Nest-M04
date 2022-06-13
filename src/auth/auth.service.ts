import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async login(dto: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = dto;

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Usuário e/ou senha inválido');
    }

    const isHashValid = await bcrypt.compare(password, user.password);
    if (!isHashValid) {
      throw new UnauthorizedException('Usuário e/ou senha inválido');
    }

    delete user.password;

    return {
      token: this.jwtService.sign({ email }),
      user,
    };
  }
}
