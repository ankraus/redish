import { Module } from '@nestjs/common';
import { GameFacade } from './game.facade';
import { AddGameHandler } from './commands/add-game.handler';
import { StartGameSessionHandler } from './commands/start-game-session.handler';
import { DomainModule } from '@redish-backend/domain';

export const commandHandlers = [AddGameHandler, StartGameSessionHandler];

@Module({
  imports: [DomainModule],
  providers: [GameFacade, ...commandHandlers],
  exports: [GameFacade, ...commandHandlers],
})
export class UsecasesModule {}
