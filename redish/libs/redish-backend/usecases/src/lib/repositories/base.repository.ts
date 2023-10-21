import { Result } from '@redish-backend/domain';

export abstract class BaseRepository<T> {
  abstract save(entity: T): Promise<Result<T>>;

  abstract remove(entity: T): Promise<Result>;

  abstract findOneById(id: string): Promise<Result<T>>;

  abstract findAll(): Promise<Array<T>>;
}
