import { GameSession } from '@redish-backend/domain';
import { BaseRepository } from './base.repository';

export abstract class GameSessionRepository extends BaseRepository<GameSession> {}
