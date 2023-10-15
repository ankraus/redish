import { Game } from '@redish-backend/domain';
import { BaseRepository } from './base.repository';

export abstract class GameRepository extends BaseRepository<Game> {}
