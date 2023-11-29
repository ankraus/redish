import { Result } from '@redish-backend/domain';

export abstract class BaseRepository<T> {
  abstract save(entity: T): Promise<Result<string>>;

  abstract remove(id: string): Promise<Result>;

  abstract findOneById(id: string): Promise<Result<T>>;
}
