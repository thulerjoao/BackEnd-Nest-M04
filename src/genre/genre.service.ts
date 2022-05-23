import { Injectable } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateGenreDto } from "./dto/create-genre.dto";
import { Genre } from "./entities/genre-entity";


@Injectable()
  export class GenreService{
    
    constructor (private readonly prisma: PrismaService){}

  findAll() {
    return this.prisma.genre.findMany();
  }
  create(dto: CreateGenreDto) {
    const data: Genre = {...dto}
    return this.prisma.genre.create({data});
}
}
