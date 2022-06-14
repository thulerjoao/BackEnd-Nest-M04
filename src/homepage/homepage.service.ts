import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HomepageService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(id: string) {
    const profileData = await this.prisma.profile.findUnique({
      where: {
        id: id,
      },
      select: {
        title: true,
        imageUrl: true,
        games: {
          include: {
            genres: true,
          },
        },
        favoriteGames:{
          select:{
            games: true
          }
        }

    }});
    const listOfGames = profileData.games;
    const favoriteGames = profileData.favoriteGames;
    const gamesDefault = [];
    const allGenres = await this.prisma.genre.findMany();
    allGenres.map((genre) => {
      const gamesGenre = [];
      listOfGames.map((game) => {
        if (game.genres[0].name == genre.name) {
          gamesGenre.push(game.title);
        }
      });
      const genreDefault = {
        genre: genre.name,
        title: gamesGenre,
      };
      if (gamesGenre.length != 0) {
        gamesDefault.push(genreDefault);
      }
    });
    return {
      games: gamesDefault,
      favoriteGames: favoriteGames,
    };
  }
}
