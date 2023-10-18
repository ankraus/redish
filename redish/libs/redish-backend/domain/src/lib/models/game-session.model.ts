import { RedishError } from '../error/redish-error';
import { Result } from '../result/result';
import { Game } from './game.model';
import { Player } from './player.model';

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
