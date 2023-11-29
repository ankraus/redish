import { Global, Module, Provider } from '@nestjs/common';
import {
  CqrsCommandBusAdapter,
  InfrastructureModule,
  NestAuthenticationService,
  NestUserService,
  TypeOrmGameRepository,
  TypeOrmUserRepository,
} from '@redish-backend/infrastructure';
import {
  AuthenticationService,
  GameRepository,
  CommandBus as RedishCommandBus,
  UsecasesModule,
  UserRepository,
  UserService,
} from '@redish-backend/usecases';

const providers: Provider[] = [
  {
    provide: RedishCommandBus,
    useExisting: CqrsCommandBusAdapter,
  },
  {
    provide: UserService,
    useExisting: NestUserService,
  },
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
];

@Global()
@Module({
  imports: [UsecasesModule, InfrastructureModule],
  providers,
  exports: [UsecasesModule, InfrastructureModule, ...providers],
})
export class ShellModule {}
