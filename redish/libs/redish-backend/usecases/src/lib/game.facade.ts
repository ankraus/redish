import { Injectable } from '@nestjs/common';
import { AddGameCommand } from './commands/add-game.command';
import { Result } from '@redish-backend/domain';
import { StartGameSessionCommand } from './commands/start-game-session.command';
import { Observable, from, map } from 'rxjs';
import { CommandBus } from './interfaces/command-bus';

@Injectable()
export class GameFacade {
  constructor(private commandBus: CommandBus) {}

  public addGame(command: AddGameCommand): Observable<Result> {
    return from(this.commandBus.execute(command)).pipe(
      map(() => Result.success())
    );
  }

  public startGameSession(
    command: StartGameSessionCommand
  ): Observable<Result> {
    return from(this.commandBus.execute(command)).pipe(
      map(() => Result.success())
    );
  }
}
