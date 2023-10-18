import { Injectable } from '@nestjs/common';
import { Game, Result } from '@redish-backend/domain';
import { GameRepository } from '@redish-backend/usecases';
import { Observable, of } from 'rxjs';

@Injectable()
export class MyGameRepository extends GameRepository {
  override add(entity: Game): Observable<Result<void>> {
    console.log('game repo: add', entity);
    return of(Result.success());
  }

  override save(): Observable<Result<void>> {
    console.log('game repo: save');
    return of(Result.success());
  }
}
