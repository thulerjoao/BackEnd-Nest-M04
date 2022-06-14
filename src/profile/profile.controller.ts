import {  Controller,  Get,  Post,  Body,  Patch,  Param,  Delete,  HttpCode,  HttpStatus,  UseGuards,} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from 'src/user/entities/user.entity';

@ApiTags('profile')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um novo perfil',
  })
  create(@LoggedUser() user: User, @Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(user.id, createProfileDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Buscar todos os perfis',
  })
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar perfil por id',
  })
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar um perfil pelo id',
  })
  update(@LoggedUser() user: User, @Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(user.id, id, updateProfileDto);
  }

  @Patch('favoriteGame/:id')
  @ApiOperation({
    summary: 'Adicionar/remover jogo aos favorito',
  })
updateFavorite(@Param('id') id: string, @Body() UpdateProfileDto: UpdateProfileDto){
  return this.profileService.addRemoveFavorite(id,UpdateProfileDto.favoriteGameId)
}


  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Deletar um perfil pelo id',
  })
  delete(@Param('id') id: string) {
    return this.profileService.delete(id);
  }
}
