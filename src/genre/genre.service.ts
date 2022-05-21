import { Injectable } from "@nestjs/common";
import { CreateGenreDto } from "./dto/create-genre.dto";

@Injectable()
  export class GenreService{
  findAll() {
    return 'Buscar todos os generos';
  }
  create(createGenreDto: CreateGenreDto) {
    return 'Cadastrar um novo Genero' + JSON.stringify(createGenreDto);
  }
}
