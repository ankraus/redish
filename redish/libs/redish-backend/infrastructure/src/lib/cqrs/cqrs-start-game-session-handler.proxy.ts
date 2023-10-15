import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  StartGameSessionCommand,
  StartGameSessionHandler,
} from '@redish-backend/usecases';

@CommandHandler(StartGameSessionCommand)
export class CqrsStartGameSessionHandlerProxy
  implements ICommandHandler<StartGameSessionCommand>
{
  constructor(private _handler: StartGameSessionHandler) {}

  public async execute(command: StartGameSessionCommand): Promise<void> {
    const result = await this._handler.execute(command);

    if (!result.success) {
      // todo decide on error handling
      console.log(result.error);
      // Promise.reject(result.error);
      // throw new Error(`${result.error?.code}: ${result.error?.message}\n${result.error?.exception}`);
    }
  }
}
