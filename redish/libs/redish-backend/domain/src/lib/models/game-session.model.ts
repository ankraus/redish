import { RedishError } from '@redish-shared/domain';
import { Game } from './game.model';
import { Player } from './player.model';
import { Result } from '../result/result';

export class GameSession {
  constructor(public game: Game) {}

  private players: Array<Player> = [];

  public addPlayer(player: Player): Result {
    if (this.game.maxNumberOfPlayers === this.players.length) {
      return Result.error(RedishError.Domain.maxNumberOfPlayersReached());
    }

    this.players.push(player);
    return Result.success();
  }
}
