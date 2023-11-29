import { CreateGameDto } from './create-game.dto';
import { UuidDto } from './uuid.dto';

export interface GameDto extends CreateGameDto, UuidDto {}
