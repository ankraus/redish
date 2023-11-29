import { Result } from '@redish-backend/domain';
import { BaseRepository } from './base.repository';

export abstract class BaseFilterRepository<T> extends BaseRepository<T> {
  abstract findAll(
    skip: number,
    take: number,
    filter?: string
  ): Promise<Result<[entities: Array<T>, count: number]>>;
}
