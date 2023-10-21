import { Module } from '@nestjs/common';
import { GameFacade } from './game.facade';
import { AddGameHandler } from './commands/add-game.handler';
import { StartGameSessionHandler } from './commands/start-game-session.handler';
import { DomainModule } from '@redish-backend/domain';
import { AuthenticationFacade } from './authentication.facade';

export const commandHandlers = [AddGameHandler, StartGameSessionHandler];

@Module({
  imports: [DomainModule],
  providers: [GameFacade, AuthenticationFacade, ...commandHandlers],
  exports: [GameFacade, AuthenticationFacade, ...commandHandlers],
})
export class UsecasesModule {}
