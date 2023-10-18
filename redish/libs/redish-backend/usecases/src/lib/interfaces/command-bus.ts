import { Result } from '@redish-backend/domain';
import { Observable } from 'rxjs';

export abstract class CommandBus {
  abstract execute(command: object): Observable<Result>;
}
