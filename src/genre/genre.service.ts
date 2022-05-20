import { Injectable } from "@nestjs/common";

@Injectable()
  export class GenreService{
  findAll() {
    return 'Buscar todos os generos';
  }
  create() {
    return 'Cadastrar um novo Genero';
  }
}
