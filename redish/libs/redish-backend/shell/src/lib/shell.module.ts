import { Global, Module, Provider } from '@nestjs/common';
import {
  ExternalDictionaryService,
  InfrastructureModule,
  NestAuthenticationService,
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
];

@Global()
@Module({
  imports: [UsecasesModule, InfrastructureModule],
  providers,
  exports: [UsecasesModule, InfrastructureModule, ...providers],
})
export class ShellModule {}
