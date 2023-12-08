import { Game, Result } from '@redish-backend/domain';
import { BaseFilterRepository } from './base-filter.repository';

export abstract class GameRepository extends BaseFilterRepository<Game> {
  public abstract override findAll(
    skip: number,
    take: number,
    filter?: string,
    minNumberOfPlayers?: number,
    maxNumberOfPlayers?: number
  ): Promise<Result<[entities: Game[], count: number]>>;
}
