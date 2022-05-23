import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateGenreDto } from "./dto/create-genre.dto";
import { UpdateGenreDto } from "./dto/update-genre.dto";
import { Genre } from "./entities/genre-entity";


@Injectable()
  export class GenreService{

  constructor (private readonly prisma: PrismaService){}

  findAll(): Promise<Genre[]> {
    return this.prisma.genre.findMany();
  }

  findOne(id:string): Promise<Genre> {
    return this.prisma.genre.findUnique({where:{ id }});
  }

  create(dto: CreateGenreDto): Promise <Genre> {
    const data: Genre = {...dto}
    return this.prisma.genre.create({data});
  }

  update(id: string, dto: UpdateGenreDto): Promise<Genre> {
    const data: Partial<Genre> = {...dto}
    return this.prisma.genre.update({
      where:{id},
      data,
    })
  }

  async delete(id: string){
    await this.prisma.genre.delete({where:{id}});
  }
}
