import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  AddGameCommand,
  GameFacade,
  StartGameSessionCommand,
} from '@redish-backend/usecases';
import { Game } from '@redish-backend/domain';
import { firstValueFrom, take } from 'rxjs';
import { GameDto } from '../dtos/game.dto';

@ApiTags('game')
@Controller('game')
export class GameController {
  constructor(private gameFacade: GameFacade) {}

  @ApiOkResponse({ type: [GameDto] })
  @Get()
  public async addGame(): Promise<GameDto> {
    const newGame = new Game('worm', 'worm', 1, 8, 'green');
    const result = await firstValueFrom(
      this.gameFacade.addGame(new AddGameCommand(newGame)).pipe(take(1))
    );

    if (result.success) {
      return new GameDto(
        newGame.id,
        newGame.name,
        newGame.minNumberOfPlayers,
        newGame.maxNumberOfPlayers,
        newGame.previewColor
      );
    }

    throw result.error;
  }

  // todo own controller
  @ApiOkResponse({ type: [GameDto] })
  @Get('session')
  public async startGameSession(): Promise<GameDto> {
    const newGame = new Game('worm', 'Worm', 1, 8, 'green');
    const result = await firstValueFrom(
      this.gameFacade
        .startGameSession(new StartGameSessionCommand('8', newGame))
        .pipe(take(1))
    );

    if (result.success) {
      return new GameDto(
        newGame.id,
        newGame.name,
        newGame.minNumberOfPlayers,
        newGame.maxNumberOfPlayers,
        newGame.previewColor
      );
    }

    throw result.error;
  }
}
