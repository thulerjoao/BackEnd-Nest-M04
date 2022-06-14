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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre-entity';
import { GenreService } from './genre.service';

@ApiTags('genre')
@UseGuards(AuthGuard())
@ApiBearerAuth()
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
  create(@Body() dto: CreateGenreDto, @LoggedUser() user: User): Promise<Genre> {
    return this.GenreService.create(dto, user);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar um gênero pelo Id',
  })
  update(@Param('id') id: string, @Body() dto: UpdateGenreDto, @LoggedUser() user: User): Promise<Genre> {
    return this.GenreService.update(id, dto, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Excluir um gênero pelo Id',
  })
  delete(@Param('id') id: string, @LoggedUser() user: User) {
    this.GenreService.delete(id, user);
  }
}
