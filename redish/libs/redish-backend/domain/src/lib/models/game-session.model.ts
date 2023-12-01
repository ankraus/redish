import { RedishError } from '@redish-shared/domain';
import { Game } from './game.model';
import { Result } from '../result/result';
import { User } from './user.model';

export class GameSession {
  constructor(public game: Game) {}

  private players: Array<User> = [];

  public addPlayer(user: User): Result {
    if (this.game.maxNumberOfPlayers === this.players.length) {
      return Result.error(RedishError.Domain.maxNumberOfPlayersReached());
    }

    this.players.push(user);
    return Result.success();
  }
}
