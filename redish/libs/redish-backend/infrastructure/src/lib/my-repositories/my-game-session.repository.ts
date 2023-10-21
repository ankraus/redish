import { Injectable } from '@nestjs/common';
import { GameSession, Result } from '@redish-backend/domain';
import { GameSessionRepository } from '@redish-backend/usecases';

@Injectable()
export class MyGameSessionRepository extends GameSessionRepository {
  override save(entity: GameSession): Promise<Result<GameSession>> {
    throw new Error('Method not implemented.');
  }
  override remove(entity: GameSession): Promise<Result<void>> {
    throw new Error('Method not implemented.');
  }
  override findOneById(id: string): Promise<Result<GameSession>> {
    throw new Error('Method not implemented.');
  }
  override findAll(): Promise<GameSession[]> {
    throw new Error('Method not implemented.');
  }

}
