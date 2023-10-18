import { Module } from '@nestjs/common';
import { DomainModule } from '@redish-backend/domain';
import { MyGameSessionRepository } from './my-repositories/my-game-session.repository';
import { MyPlayerRepository } from './my-repositories/my-player.repository';
import { MyGameRepository } from './my-repositories/my-game.repository';
import { TypeOrmRootModule } from './database/type-orm.module';
import { CqrsCommandBusAdapter } from './cqrs/cqrs-command-bus.adapter';
import { CqrsModule } from '@nestjs/cqrs';
import { CqrsStartGameSessionHandlerProxy } from './cqrs/cqrs-start-game-session-handler.proxy';
import { CqrsAddGameHandlerProxy } from './cqrs/cqrs-add-game-handler.proxy';

const repositories = [
  MyGameRepository,
  MyGameSessionRepository,
  MyPlayerRepository,
];

const cqrsHandlerProxies = [
  CqrsStartGameSessionHandlerProxy,
  CqrsAddGameHandlerProxy,
];

@Module({
  imports: [DomainModule, TypeOrmRootModule, CqrsModule],
  providers: [
    ...repositories,
    CqrsCommandBusAdapter,
    TypeOrmRootModule,
    ...cqrsHandlerProxies,
  ],
  exports: [...repositories, CqrsCommandBusAdapter, TypeOrmRootModule],
})
export class InfrastructureModule {}
