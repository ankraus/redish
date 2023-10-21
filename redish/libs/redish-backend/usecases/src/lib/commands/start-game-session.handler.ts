import { StartGameSessionCommand } from './start-game-session.command';
import { GameSession, Result } from '@redish-backend/domain';
import { firstValueFrom, take } from 'rxjs';
import { Injectable, Res } from '@nestjs/common';
import { GameSessionRepository } from '../repositories/game-session.repository';
import { PlayerRepository } from '../repositories/player.repository';

@Injectable()
export class StartGameSessionHandler {
  constructor(
    private _gamesSessionRepository: GameSessionRepository,
    private _playerRepository: PlayerRepository
  ) {}

  public async execute(command: StartGameSessionCommand): Promise<Result> {
    const playerResult = await firstValueFrom(
      this._playerRepository.getPlayerById(command.playerId).pipe(take(1))
    );
    if (!playerResult.success) {
      return Result.error(playerResult.error!);
    }

    const session = new GameSession(command.game);
    const result = session.addPlayer(playerResult.result!);
    if (!result.success) {
      return result;
    }

    await this._gamesSessionRepository.save(session);
    return Result.success();
  }
}
