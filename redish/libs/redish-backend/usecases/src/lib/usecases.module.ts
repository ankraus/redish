import { Module } from '@nestjs/common';
import { GameFacade } from './game.facade';
import { DomainModule } from '@redish-backend/domain';
import { UserFacade } from './user.facade';

@Module({
  imports: [DomainModule],
  providers: [GameFacade, UserFacade],
  exports: [GameFacade, UserFacade],
})
export class UsecasesModule {}
