import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RedishError, Result } from '@redish-backend/domain';
import { CommandBus as RedishCommandBus } from '@redish-backend/usecases';
import { Observable, catchError, from, map, of } from 'rxjs';

@Injectable()
export class CqrsCommandBusAdapter extends RedishCommandBus {
  constructor(private _commandBus: CommandBus) {
    super();
  }

  public override execute(command: object): Observable<Result> {
    return from(this._commandBus.execute(command)).pipe(
      map(Result.success),
      catchError((e) =>
        of(
          Result.error(
            RedishError.Infrastructure.unknownCqrsError(e)
          )
        )
      )
    );
  }
}
