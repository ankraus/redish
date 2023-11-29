import { Result } from '@redish-backend/domain';
import { BaseRepository } from './base.repository';

/**
 * Disclaimer - Interface Segregation Principle
 * It would be better to have independent interfaces, which are not dependent on each other.
 *
 * However, this would mean using interfaces instead of abstract classes, which would in turn
 * mean that we would have to use dependency injection tokens ("magic strings") when providing
 * implementations for the interfaces. This is not a good practice, as it is not type-safe.
 *
 * On top of that, we would still have to use one dependent class (FilterAndCrud) in the
 * implementation, because you cannot extend multiple classes in TypeScript.
 *
 * In the end, it is improbable, that we will have a domain entity, which needs filtering, but
 * does not need CRUD operations.
 *
 * Therefore, we decided to use dependent abstract classes instead of segregated interfaces.
 */
export abstract class BaseFilterRepository<T> extends BaseRepository<T> {
  abstract findAll(
    skip: number,
    take: number,
    filter?: string
  ): Promise<Result<[entities: Array<T>, count: number]>>;
}
