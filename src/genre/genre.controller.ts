import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateGenreDto } from "./dto/create-genre.dto";
import { GenreService } from "./genre.service";

@ApiTags('genre')
@Controller('genre')
export class GenreController {
  constructor(private readonly GenreService: GenreService){}

  @Get()
  findAll(){
    return this.GenreService.findAll();
  }

  @Post()
  create(@Body() dto: CreateGenreDto){
    return this.GenreService.create(dto);
  }
}
