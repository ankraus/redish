import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainModule } from '@redish-backend/domain';
import { NestAuthenticationService } from './service/nest-authentication.service';
import { TypeOrmRootModule } from './database/type-orm.module';
import { User } from './typeorm-entities/typeorm.user.entity';
import { TypeOrmGameRepository } from './typeorm-repositories/typeorm.game.repository';
import { TypeOrmUserRepository } from './typeorm-repositories/typeorm.user.repository';
import { Game } from './typeorm-entities/typeorm.game.entity';
import { ExternalDictionaryService } from './service/external-dictionary.service';

const repositories = [TypeOrmUserRepository, TypeOrmGameRepository];

const entities = [User, Game];

const services = [NestAuthenticationService, ExternalDictionaryService];

@Module({
  imports: [
    DomainModule,
    TypeOrmRootModule,
    CqrsModule,
    TypeOrmModule.forFeature(entities),
  ],
  providers: [...repositories, ...services, TypeOrmRootModule],
  exports: [...repositories, ...services, TypeOrmRootModule],
})
export class InfrastructureModule {}
