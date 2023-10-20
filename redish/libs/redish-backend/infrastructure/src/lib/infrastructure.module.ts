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
import { NestAuthenticationModule } from './authentication/nest-authentication.module';
import { NestAuthenticationService } from './authentication/nest-authentication.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './typeorm-entities/user.entity';
import {UserRepository} from './typeorm-repositories/user.repository';

const repositories = [
  MyGameRepository,
  MyGameSessionRepository,
  MyPlayerRepository,
  UserRepository
];

const cqrsHandlerProxies = [
  CqrsStartGameSessionHandlerProxy,
  CqrsAddGameHandlerProxy,
];

const services = [NestAuthenticationService];

@Module({
  imports: [
    DomainModule,
    TypeOrmRootModule,
    CqrsModule,
    NestAuthenticationModule,
    TypeOrmModule.forFeature([User])
  ],
  providers: [
    ...repositories,
    ...services,
    CqrsCommandBusAdapter,
    TypeOrmRootModule,
    NestAuthenticationModule,
    ...cqrsHandlerProxies,
  ],
  exports: [
    ...repositories,
    ...services,
    CqrsCommandBusAdapter,
    TypeOrmRootModule,
  ],
})
export class InfrastructureModule {}
