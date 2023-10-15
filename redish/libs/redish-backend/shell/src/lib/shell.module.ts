import { Module, Global, Provider } from '@nestjs/common';
import {
  CqrsCommandBusAdapter,
  InfrastructureModule,
  MyGameRepository,
  MyGameSessionRepository,
  MyPlayerRepository,
} from '@redish-backend/infrastructure';
import {
  GameRepository,
  GameSessionRepository,
  PlayerRepository,
  CommandBus as RedishCommandBus,
  UsecasesModule,
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
];

@Global()
@Module({
  imports: [UsecasesModule, InfrastructureModule],
  providers,
  exports: [UsecasesModule, InfrastructureModule, ...providers],
})
export class ShellModule {}
