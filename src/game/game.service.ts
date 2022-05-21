import { Injectable } from "@nestjs/common";
import { CreateGameDto } from "./dto/create-game.dto";

@Injectable()
export class GameService{
  findAll() {
    return 'Buscar todos os jogos';
  }
  create(createGameDto: CreateGameDto) {
    return 'Cadastrar um novo jogo' + JSON.stringify(createGameDto);
  }
}
