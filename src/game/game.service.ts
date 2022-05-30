import {
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game-entity';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(){
    return this.prisma.game.findMany({include:{
      genres:true
    }});
  }

  async findById(id: string): Promise<Game> {
    const record = await this.prisma.game.findUnique({
      where: { id: id },
      include:{
        genres:true
      }
     });
    if (!record) {
      throw new NotFoundException(
        `Nenhum registro com o ID '${id}' foi encontrado`,
      );
    }
    return record;
  }

  async findOne(id: string) {
    return this.findById(id);
  }

  async create(dto: CreateGameDto){
    const data: Prisma.GameCreateInput = {
      name:dto.name,
      image:dto.image,
      description:dto.description,
      ageRating:dto.ageRating,
      score:dto.score,
      price:dto.price,
      genres: {
        connect:{
          genre: dto.genreName,
        }
      }
    };
    return await this.prisma.game.create({
      data, include:{
        genres: true
      }
    }).catch(handleError);
  }
  async update(id: string, dto: UpdateGameDto){
    const gameAtual = await this.findById(id);
    const data: Partial<Game> = {
      name:dto.name,
      image:dto.image,
      description:dto.description,
      ageRating:dto.ageRating,
      score:dto.score,
      price:dto.price,
      genres: {
        disconnect:{
          genre: gameAtual.genres[0].genre
        },
        connect:{
          genre: dto.genreName,
        }
      }
    };
    return this.prisma.game
      .update({
        where: { id },
        data,
      })
      .catch(handleError);
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.game.delete({ where: { id } });
  }
}


