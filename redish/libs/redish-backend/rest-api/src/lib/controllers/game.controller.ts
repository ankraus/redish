import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  AddGameCommand,
  GameFacade,
  StartGameSessionCommand,
} from '@redish-backend/usecases';
import { GameReadDto } from '../dtos/game-read.dto';
import { IGame } from '@redish-shared/domain';
import { Game } from '@redish-backend/domain';
import { firstValueFrom, take } from 'rxjs';

@ApiTags('game')
@Controller('game')
export class GameController {
  constructor(private gameFacade: GameFacade) {}

  @ApiOkResponse({ type: [GameReadDto] })
  @Get()
  public async addGame(): Promise<IGame> {
    const newGame = new Game('1', 'worm', 1, 8);
    const result = await firstValueFrom(
      this.gameFacade.addGame(new AddGameCommand(newGame)).pipe(take(1))
    );

    if (result.success) {
      return new GameReadDto(
        newGame.id,
        newGame.name,
        newGame.minNumberOfPlayers,
        newGame.maxNumberOfPlayers
      );
    }

    throw result.error;
  }

  // todo own controller
  @ApiOkResponse({ type: [GameReadDto] })
  @Get('session')
  public async startGameSession(): Promise<IGame> {
    const newGame = new Game('1', 'worm', 1, 8);
    const result = await firstValueFrom(
      this.gameFacade
        .startGameSession(new StartGameSessionCommand('8', newGame))
        .pipe(take(1))
    );

    if (result.success) {
      return new GameReadDto(
        newGame.id,
        newGame.name,
        newGame.minNumberOfPlayers,
        newGame.maxNumberOfPlayers
      );
    }

    throw result.error;
  }
}
