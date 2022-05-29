import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private userService = {
    id: true,
    name: true,
    email: true,
    password: false,
    photo: true,
    createdAt: true,
    updatedAt: true
  };
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany({select: this.userService});
  }

  async findById(id: string): Promise<User> {
    const record = await this.prisma.user.findUnique({ where: { id }, select: this.userService});
    if (!record) {
      throw new NotFoundException(
        `Nenhum registro com o ID '${id}' foi encontrado`,
      );
    }
    return record;
  }

  async findOne(id: string): Promise<User> {
    return this.findById(id);
  }

  async create(dto: CreateUserDto): Promise<User> {
    if(dto.password != dto.confirmPassword){
      throw new BadRequestException('As senhas devem ser iguais')
    }
    delete dto.confirmPassword;
    const data: User = { ...dto,
      password: await bcrypt.hash(dto.password, 10)
     };
    return this.prisma.user.create({ data, select: this.userService }).catch(this.handleError);
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    await this.findById(id);
    if(dto.password){
      if(dto.password != dto.confirmPassword){
        throw new BadRequestException('As senhas devem ser iguais');
      }
    }
    delete dto.confirmPassword;
    const data: Partial<User> = {...dto};
    if(data.password){
      data.password = await bcrypt.hash(dto.password, 10);
    }
    return this.prisma.user
      .update({
        where: { id },
        data,
        select: this.userService
      })
      .catch(this.handleError);
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.user.delete({where: { id }});
  }

  handleError(error: Error): undefined {
    const errorLines = error.message?.split('\n');
    const lastLineError = errorLines[errorLines.length - 1]?.trim();
    throw new UnprocessableEntityException(
      lastLineError || 'Erro ao tentar executar',
    );
  }
}

