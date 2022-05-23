import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateGameDto } from "./dto/create-game.dto";
import { Game } from "./entities/game-entity";
import { GameService } from "./game.service";

@ApiTags('game')
@Controller('game')
export class GameController{
  constructor(private readonly GameService: GameService) {}

  @Get()
  @ApiOperation({
    summary:'Listar todos os jogos'
  })
  findAll(): Promise<Game[]>{
    return this.GameService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary:'Buscar um jogo'
  })
  findOne(@Param('id') id:string): Promise<Game>{
    return this.GameService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary:'Cadastrar um jogo'
  })
  create(@Body() dto: CreateGameDto): Promise<Game>{
    return this.GameService.create(dto);

  }

}
