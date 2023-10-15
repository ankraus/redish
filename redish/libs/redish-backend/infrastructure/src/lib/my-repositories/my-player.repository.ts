import { Injectable } from '@nestjs/common';
import { Player, Result } from '@redish-backend/domain';
import { Observable, of } from 'rxjs';
import { RedishInfrastructureError } from '../error/redish-infrastructure-error';
import { PlayerRepository } from '@redish-backend/usecases';

@Injectable()
export class MyPlayerRepository extends PlayerRepository {
  override add(entity: Player): Observable<Result<void>> {
    console.log('game repo: add', entity);
    return of(Result.success());
  }

  override save(): Observable<Result<void>> {
    console.log('game repo: save');
    return of(Result.success());
  }

  override getPlayerById(id: string): Observable<Result<Player>> {
    return of(
      Result.error<Player>(
        RedishInfrastructureError.Infrastructure.repositoryNotAvailable()
      )
    );
  }
}
