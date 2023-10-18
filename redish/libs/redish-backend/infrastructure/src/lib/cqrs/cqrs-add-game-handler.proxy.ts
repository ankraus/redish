import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddGameCommand, AddGameHandler } from '@redish-backend/usecases';
import { firstValueFrom } from 'rxjs';

@CommandHandler(AddGameCommand)
export class CqrsAddGameHandlerProxy
  implements ICommandHandler<AddGameCommand>
{
  constructor(private _handler: AddGameHandler) {}

  public async execute(command: AddGameCommand): Promise<void> {
    const result = await firstValueFrom(this._handler.execute(command));

    if (!result.success) {
      // todo decide on error handling
      Promise.reject(result.error);
      // throw new Error(
      //   `${result.error?.code}: ${result.error?.message}\n${result.error?.exception}`
      // );
    }
  }
}
