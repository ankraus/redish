import { Result } from '@redish-backend/domain';
import { FilterDto } from '@redish-shared/domain';
import { BaseRepository } from './base.repository';

export abstract class BaseFilterRepository<T> extends BaseRepository<T> {
  abstract findAll(
    filterDto: FilterDto
  ): Promise<Result<[entities: Array<T>, count: number]>>;
}
