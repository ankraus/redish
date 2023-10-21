import { Injectable } from '@nestjs/common';
import { Player, Result } from '@redish-backend/domain';
import { Observable, of } from 'rxjs';
import { PlayerRepository } from '@redish-backend/usecases';

@Injectable()
export class MyPlayerRepository extends PlayerRepository {
  override getPlayerById(id: string): Observable<Result<Player>> {
    throw new Error('Method not implemented.');
  }
  override save(entity: Player): Promise<Result<Player>> {
    throw new Error('Method not implemented.');
  }
  override remove(entity: Player): Promise<Result<void>> {
    throw new Error('Method not implemented.');
  }
  override findOneById(id: string): Promise<Result<Player>> {
    throw new Error('Method not implemented.');
  }
  override findAll(): Promise<Player[]> {
    throw new Error('Method not implemented.');
  }
  
}
