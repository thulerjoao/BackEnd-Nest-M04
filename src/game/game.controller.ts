import { Controller, Get, Post } from "@nestjs/common";
import { get } from "http";
import { GameService } from "./game.service";

@Controller('game')
export class GameController{
  constructor(private GameService: GameService) {}

  @Get()
  findAll(){
    return this.GameService.findAll();

  }

  @Post()
  create(){
    return this.GameService.create();

  }

}
