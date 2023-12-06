export * from './lib/infrastructure.module';

// repositories
export { TypeOrmUserRepository } from './lib/typeorm-repositories/typeorm.user.repository';
export { TypeOrmGameRepository } from './lib/typeorm-repositories/typeorm.game.repository';

// services
export { NestAuthenticationService } from './lib/service/nest-authentication.service';
export { ExternalDictionaryService } from './lib/service/external-dictionary.service';
