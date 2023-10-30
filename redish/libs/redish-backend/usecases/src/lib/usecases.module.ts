import { Module } from '@nestjs/common';
import { GameFacade } from './game.facade';
import { AddGameHandler } from './commands/add-game.handler';
import { StartGameSessionHandler } from './commands/start-game-session.handler';
import { DomainModule } from '@redish-backend/domain';
import { UserFacade } from './authentication.facade';

export const commandHandlers = [AddGameHandler, StartGameSessionHandler];

@Module({
  imports: [DomainModule],
  providers: [GameFacade, UserFacade, ...commandHandlers],
  exports: [GameFacade, UserFacade, ...commandHandlers],
})
export class UsecasesModule {}
