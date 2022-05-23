import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateGameDto } from "./dto/create-game.dto";
import { GameService } from "./game.service";

@ApiTags('game')
@Controller('game')
export class GameController{
  constructor(private readonly GameService: GameService) {}

  @Get()
  findAll(){
    return this.GameService.findAll();

  }

  @Post()
  create(@Body() dto: CreateGameDto){
    return this.GameService.create(dto);

  }

}
