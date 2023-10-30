import { Module, Global, Provider } from '@nestjs/common';
import {
  CqrsCommandBusAdapter,
  InfrastructureModule,
  MyGameRepository,
  MyGameSessionRepository,
  MyPlayerRepository,
  NestUserService,
  TypeOrmUserRepository,
} from '@redish-backend/infrastructure';
import {
  UserService,
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
    provide: UserService,
    useExisting: NestUserService,
  },
  {
    provide: UserRepository,
    useExisting: TypeOrmUserRepository,
  },
];

@Global()
@Module({
  imports: [UsecasesModule, InfrastructureModule],
  providers,
  exports: [UsecasesModule, InfrastructureModule, ...providers],
})
export class ShellModule {}
