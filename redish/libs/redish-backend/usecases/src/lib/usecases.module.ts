import { Module } from '@nestjs/common';
import { GameFacade } from './game.facade';
import { DomainModule } from '@redish-backend/domain';
import { UserFacade } from './user.facade';
import { DictionaryFacade } from './dictionary.facade';

@Module({
  imports: [DomainModule],
  providers: [GameFacade, UserFacade, DictionaryFacade],
  exports: [GameFacade, UserFacade, DictionaryFacade],
})
export class UsecasesModule {}
