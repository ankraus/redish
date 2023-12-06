import { Global, Module, Provider } from '@nestjs/common';
import {
  CacheService,
  ExternalDictionaryService,
  InfrastructureModule,
  NestAuthenticationService,
  RedisCacheService,
  TypeOrmGameRepository,
  TypeOrmUserRepository,
} from '@redish-backend/infrastructure';
import {
  AuthenticationService,
  DictionaryService,
  GameRepository,
  UsecasesModule,
  UserRepository,
} from '@redish-backend/usecases';

const providers: Provider[] = [
  {
    provide: AuthenticationService,
    useExisting: NestAuthenticationService,
  },
  {
    provide: UserRepository,
    useExisting: TypeOrmUserRepository,
  },
  {
    provide: GameRepository,
    useExisting: TypeOrmGameRepository,
  },
  {
    provide: DictionaryService,
    useExisting: ExternalDictionaryService,
  },
  {
    provide: CacheService,
    useExisting: RedisCacheService,
  },
];

@Global()
@Module({
  imports: [UsecasesModule, InfrastructureModule],
  providers,
  exports: [UsecasesModule, InfrastructureModule, ...providers],
})
export class ShellModule {}
