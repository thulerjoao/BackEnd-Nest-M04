import { Game } from 'src/game/entities/game-entity';
import { User } from 'src/user/entities/user.entity';

export class Profile {
  id?: string;
  name: string;
  photo: string;
  user?: User;
  games?: Game[];
}
