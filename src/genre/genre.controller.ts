import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateGenreDto } from "./dto/create-genre.dto";
import { GenreService } from "./genre.service";

@Controller('genre')
export class GenreController {
  constructor(private GenreService: GenreService){}

  @Get()
  findAll(){
    return this.GenreService.findAll();

  }

  @Post()
  create(@Body() createGenreDto: CreateGenreDto){
    return this.GenreService.create(createGenreDto);
  }
}
