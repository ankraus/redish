import { Injectable } from '@nestjs/common';
import { AddGameCommand } from './add-game.command';
import { Result } from '@redish-backend/domain';
import { Observable, switchMap } from 'rxjs';
import { GameRepository } from '../repositories/game.repository';

@Injectable()
export class AddGameHandler {
  constructor(private _repository: GameRepository) {}

  public execute(command: AddGameCommand): Observable<Result> {
    return this._repository
      .add(command.game)
      .pipe(switchMap(() => this._repository.save()));
  }
}
