import { Injectable } from "@nestjs/common";
import { CreateGameDto } from "./dto/create-game.dto";
import { Game } from "./entities/game-entity";

@Injectable()
export class GameService{
  game:Game[] = [];

  findAll() {
    return 'Buscar todos os jogos';
  }
  create(createGameDto: CreateGameDto) {
    const game: Game = { id:'randon_id', ...createGameDto}
    this.game.push(game);
    return game;
  }
}
