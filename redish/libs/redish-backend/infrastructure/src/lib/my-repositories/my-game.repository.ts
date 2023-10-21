import { Injectable } from '@nestjs/common';
import { Game, Result } from '@redish-backend/domain';
import { GameRepository } from '@redish-backend/usecases';
import { Observable, of } from 'rxjs';

@Injectable()
export class MyGameRepository extends GameRepository {
  override save(entity: Game): Promise<Result<Game>> {
    throw new Error('Method not implemented.');
  }
  override remove(entity: Game): Promise<Result<void>> {
    throw new Error('Method not implemented.');
  }
  override findOneById(id: string): Promise<Result<Game>> {
    throw new Error('Method not implemented.');
  }
  override findAll(): Promise<Game[]> {
    throw new Error('Method not implemented.');
  }

}
