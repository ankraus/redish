import { Game } from '@redish-backend/domain';
import { BaseFilterRepository } from './base-filter.repository';

export abstract class GameRepository extends BaseFilterRepository<Game> {}
