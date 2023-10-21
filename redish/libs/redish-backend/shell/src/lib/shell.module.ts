import { Module, Global, Provider } from '@nestjs/common';
import {
  CqrsCommandBusAdapter,
  InfrastructureModule,
  MyGameRepository,
  MyGameSessionRepository,
  MyPlayerRepository,
  NestAuthenticationService,
  TypeOrmUserRepository,
} from '@redish-backend/infrastructure';
import {
  AuthenticationService,
  GameRepository,
  GameSessionRepository,
  PlayerRepository,
  CommandBus as RedishCommandBus,
  UsecasesModule,
  UserRepository,
} from '@redish-backend/usecases';

const providers: Provider[] = [
  {
    provide: PlayerRepository,
    useExisting: MyPlayerRepository,
  },
  {
    provide: GameRepository,
    useExisting: MyGameRepository,
  },
  {
    provide: GameSessionRepository,
    useExisting: MyGameSessionRepository,
  },

  {
    provide: RedishCommandBus,
    useExisting: CqrsCommandBusAdapter,
  },

  {
    provide: AuthenticationService,
    useExisting: NestAuthenticationService,
  },
  {
    provide: UserRepository,
    useExisting: TypeOrmUserRepository,
  }
];

@Global()
@Module({
  imports: [UsecasesModule, InfrastructureModule],
  providers,
  exports: [UsecasesModule, InfrastructureModule, ...providers],
})
export class ShellModule {}
