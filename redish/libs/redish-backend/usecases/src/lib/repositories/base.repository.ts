import { Result } from "@redish-backend/domain";
import { Observable } from "rxjs";

export abstract class BaseRepository<T> {
  abstract add(entity: T): Observable<Result>;

  abstract save(): Observable<Result>;
}
