import { InjectRepository } from '@nestjs/typeorm';
import { Game as DomainGame } from '@redish-backend/domain';
import { GameRepository } from '@redish-backend/usecases';
import { Like, Repository } from 'typeorm';
import { Game } from '../typeorm-entities/typeorm.game.entity';
import { BaseFilterTypeOrmRepository } from './base-filter-typeorm.repository';

export class TypeOrmGameRepository
  extends BaseFilterTypeOrmRepository<DomainGame>
  implements GameRepository
{
  constructor(
    @InjectRepository(Game)
    gameRepository: Repository<Game>
  ) {
    super(gameRepository, (filter: string) => ({ name: Like(`%${filter}%`) }));
  }
}
