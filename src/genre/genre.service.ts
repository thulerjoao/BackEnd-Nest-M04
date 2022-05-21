import { Injectable } from "@nestjs/common";
import { CreateGenreDto } from "./dto/create-genre.dto";
import { Genre } from "./entities/genre-entity";

@Injectable()
  export class GenreService{
    genre: Genre[] = []

  findAll() {
    return 'Buscar todos os generos';
  }
  create(createGenreDto: CreateGenreDto) {
    const genre: Genre = { id:'id_random', ...createGenreDto}
    this.genre.push(genre);
    return genre;
}
}
