import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateProfileDto) {
    if (dto.gameId) {
      return await this.prisma.profile
        .create({
          data: {
            title: dto.title,
            imageUrl: dto.imageUrl,
            userId: userId,
            games: {
              connect: {
                id: dto.gameId,
              },
            },
          },
          include: { games: true, favoriteGames:true },
        })
        .catch(handleError);
    } else {
      return await this.prisma.profile
        .create({
          data: {
            title: dto.title,
            imageUrl: dto.imageUrl,
            userId: userId,
          },
          include: { games: true, favoriteGames:true },
        })
        .catch(handleError);
    }
  }

  findAll(){
    return this.prisma.profile.findMany({
      include: {
        user: true,
        games: true,
        favoriteGames: {
          select:{
            games:{
              select:{
                title: true
              }
            }
          }
        }
      },
    });
  }

  async findById(id: string) {
    const record = await this.prisma.profile.findUnique({
      where: {
        id: id,
      },
      include: {
        games: true,
        favoriteGames:{
          select:{
            games:true,
            id: true
          }
        } },
    });
    if (!record) {
      throw new NotFoundException(`Profile com id ${id} não encontrado`);
    }
    return record;
  }

  async findOne(id: string) {
    return this.findById(id);
  }

  async update(userId: string, id: string, dto: UpdateProfileDto) {
    const user = await this.findById(id);

    if (dto.gameId) {
      let GameExist = false;
      user.games.map((game) => {
        if (game.id == dto.gameId) {
          GameExist = true;
        }
      });
      if (GameExist) {
        return this.prisma.profile
          .update({
            where: { id: id },
            data: {
              title: dto.title,
              imageUrl: dto.imageUrl,
              userId: userId,
              games: {
                disconnect: {
                  id: dto.gameId,
                },
              },
            },
            include: { games: true },
          })
          .catch(handleError);
      } else {
        return this.prisma.profile
          .update({
            where: { id: id },
            data: {
              title: dto.title,
              imageUrl: dto.imageUrl,
              userId: userId,
              games: {
                connect: {
                  id: dto.gameId,
                },
              },
            },
            include: { games: true },
          })
          .catch(handleError);
      }
    } else {
      return this.prisma.profile
        .update({
          where: { id: id },
          data: {
            title: dto.title,
            imageUrl: dto.imageUrl,
            userId: userId,
          },
          include: { games: true },
        })
        .catch(handleError);
    }
  }

  async addRemoveFavorite(profileId: string, gameId: string) {
    const user = await this.findOne(profileId);
    let favoritedGame = false;
    if(user.favoriteGames){

      user.favoriteGames.games.map((game)=>{
        if(gameId===game.id){
          favoritedGame = true;
        }
      })
    }else{
      return this.prisma.favoriteGames.create({
        data:{
        profile: {
          connect:{
            id: profileId
          },
        },
        games: {
          connect:{
            id: gameId
          }
        }
        }
      })
    }
    if(favoritedGame){
      return await this.prisma.favoriteGames.update({
        where:{
          id: user.favoriteGames.id,

        },
        data:{
          games:{
            disconnect:{
              id: gameId,
            }
          }
        }
      })
    }else{
      return await this.prisma.favoriteGames.update({
        where:{
          id: user.favoriteGames.id,

        },
        data:{
          games:{
            connect:{
              id: gameId,
            }
          }
        }
      })
    }
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.profile.delete({ where: { id } });
  }
}
