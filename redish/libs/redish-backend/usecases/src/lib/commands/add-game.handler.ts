import { Injectable } from '@nestjs/common';
import { AddGameCommand } from './add-game.command';
import { Game, Result } from '@redish-backend/domain';
import { GameRepository } from '../repositories/game.repository';

@Injectable()
export class AddGameHandler {
  constructor(private _repository: GameRepository) {}

  public execute(command: AddGameCommand): Promise<Result<Game>> {
    return this._repository
      .save(command.game);
  }
}
