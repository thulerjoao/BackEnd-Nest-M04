import { Controller, Get, Post } from "@nestjs/common";
import { GenreService } from "./genre.service";

@Controller('genre')
export class GenreController {
  constructor(private GenreService: GenreService){}

  @Get()
  findAll(){
    return this.GenreService.findAll();

  }

  @Post()
  create(){
    return this.GenreService.create();
  }
}
