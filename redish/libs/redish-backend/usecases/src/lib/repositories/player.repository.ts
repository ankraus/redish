import { Observable } from 'rxjs';
import { BaseRepository } from './base.repository';
import { Player, Result } from '@redish-backend/domain';

export abstract class PlayerRepository extends BaseRepository<Player> {
  abstract getPlayerById(id: string): Observable<Result<Player>>;
}
