import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre-entity';
import { GenreService } from './genre.service';

@ApiTags('genre')
@Controller('genre')
export class GenreController {
  constructor(private readonly GenreService: GenreService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar todos os gêneros',
  })
  findAll(): Promise<Genre[]> {
    return this.GenreService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar um gênero',
  })
  findOne(@Param('id') id: string): Promise<Genre> {
    return this.GenreService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Cadastrar um gênero',
  })
  create(@Body() dto: CreateGenreDto): Promise<Genre> {
    return this.GenreService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar um gênero pelo Id',
  })
  update(@Param('id') id: string, @Body() dto: UpdateGenreDto): Promise<Genre> {
    return this.GenreService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Excluir um gênero pelo Id',
  })
  delete(@Param('id') id: string) {
    this.GenreService.delete(id);
  }
}
