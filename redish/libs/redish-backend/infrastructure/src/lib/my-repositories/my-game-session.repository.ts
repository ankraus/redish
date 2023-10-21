import { Injectable } from '@nestjs/common';
import { GameSession, Result } from '@redish-backend/domain';
import { GameSessionRepository } from '@redish-backend/usecases';
import { Observable, of } from 'rxjs';

@Injectable()
export class MyGameSessionRepository extends GameSessionRepository {
  override add(entity: GameSession): Observable<Result<void>> {
    console.log('game repo: add', entity);
    return of(Result.success());
  }

  override save(): Observable<Result<void>> {
    console.log('game repo: save');
    return of(Result.success());
  }
}
