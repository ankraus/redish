import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainModule } from '@redish-backend/domain';
import { NestAuthenticationService } from './authentication/nest-authentication.service';
import { NestUserService } from './authentication/nest-user.service';
import { CqrsAddGameHandlerProxy } from './cqrs/cqrs-add-game-handler.proxy';
import { CqrsCommandBusAdapter } from './cqrs/cqrs-command-bus.adapter';
import { CqrsStartGameSessionHandlerProxy } from './cqrs/cqrs-start-game-session-handler.proxy';
import { TypeOrmRootModule } from './database/type-orm.module';
import { User } from './typeorm-entities/typeorm.user.entity';
import { TypeOrmGameRepository } from './typeorm-repositories/typeorm.game.repository';
import { TypeOrmUserRepository } from './typeorm-repositories/typeorm.user.repository';
import { Game } from './typeorm-entities/typeorm.game.entity';

const repositories = [TypeOrmUserRepository, TypeOrmGameRepository];

const entities = [User, Game];

const cqrsHandlerProxies = [
  CqrsStartGameSessionHandlerProxy,
  CqrsAddGameHandlerProxy,
];

const services = [NestUserService, NestAuthenticationService];

@Module({
  imports: [
    DomainModule,
    TypeOrmRootModule,
    CqrsModule,
    TypeOrmModule.forFeature(entities),
  ],
  providers: [
    ...repositories,
    ...services,
    CqrsCommandBusAdapter,
    TypeOrmRootModule,
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
