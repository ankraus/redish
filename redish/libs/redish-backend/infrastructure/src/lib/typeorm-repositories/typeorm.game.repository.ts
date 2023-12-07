import { InjectRepository } from '@nestjs/typeorm';
import { Game as DomainGame, Result } from '@redish-backend/domain';
import { GameRepository } from '@redish-backend/usecases';
import { RedishError } from '@redish-shared/domain';
import { LessThanOrEqual, Like, MoreThanOrEqual, Repository } from 'typeorm';
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

  override async findAll(
    skip: number,
    take: number,
    filter?: string,
    minNumberOfPlayers?: number,
    maxNumberOfPlayers?: number
  ): Promise<Result<[entities: Array<DomainGame>, count: number]>> {
    try {
      const [entities, count] = await this.repository.findAndCount({
        skip,
        take,
        where: {
          name: filter ? Like(`%${filter}%`) : undefined,
          minNumberOfPlayers: maxNumberOfPlayers
            ? LessThanOrEqual(maxNumberOfPlayers)
            : undefined,
          maxNumberOfPlayers: minNumberOfPlayers
            ? MoreThanOrEqual(minNumberOfPlayers)
            : undefined,
        },
      });

      return Result.success([entities, count]);
    } catch (error: unknown) {
      return Result.error(RedishError.Infrastructure.databaseError(error));
    }
  }
}
