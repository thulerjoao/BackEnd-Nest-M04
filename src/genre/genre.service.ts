import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre-entity';

@Injectable()
export class GenreService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Genre[]> {
    return this.prisma.genre.findMany();
  }

  async findById(id: string): Promise<Genre> {
    const record = await this.prisma.genre.findUnique({ where: { id } });
    if (!record) {
      throw new NotFoundException(
        `Nenhum registro com o ID '${id}' foi encontrado`,
      );
    }
    return record;
  }

  async findOne(id: string): Promise<Genre> {
    return this.findById(id);
  }

  create(dto: CreateGenreDto): Promise<Genre> {
    const data: Genre = { ...dto };
    return this.prisma.genre.create({ data }).catch(this.handleError);
  }

  async update(id: string, dto: UpdateGenreDto): Promise<Genre> {
    await this.findById(id);
    const data: Partial<Genre> = { ...dto };
    return this.prisma.genre
      .update({
        where: { id },
        data,
      })
      .catch(this.handleError);
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.genre.delete({ where: { id } });
  }

  handleError(error: Error): undefined {
    const errorLines = error.message?.split('\n');
    const lastLineError = errorLines[errorLines.length - 1]?.trim();
    throw new UnprocessableEntityException(
      lastLineError || 'Erro ao tentar executar',
    );
  }
}
