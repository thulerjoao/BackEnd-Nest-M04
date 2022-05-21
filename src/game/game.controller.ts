import { Body, Controller, Get, Post } from "@nestjs/common";
import { get } from "http";
import { CreateGameDto } from "./dto/create-game.dto";
import { GameService } from "./game.service";

@Controller('game')
export class GameController{
  constructor(private GameService: GameService) {}

  @Get()
  findAll(){
    return this.GameService.findAll();

  }

  @Post()
  create(@Body() createGameDto: CreateGameDto){
    return this.GameService.create(createGameDto);

  }

}
