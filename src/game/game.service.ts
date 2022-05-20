import { Injectable } from "@nestjs/common";

@Injectable()
export class GameService{
  findAll() {
    return 'Buscar todos os jogos';
  }
  create() {
    return 'Cadastrar um novo jogo';
  }
}
