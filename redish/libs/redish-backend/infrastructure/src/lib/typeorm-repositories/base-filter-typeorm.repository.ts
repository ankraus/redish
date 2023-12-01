import { Result } from '@redish-backend/domain';
import { RedishError } from '@redish-shared/domain';
import { FindOptionsWhere, Repository } from 'typeorm';
import { BaseTypeOrmRepository } from './base-typeorm.repository';
import { BaseTypeOrmUuidEntity } from '../typeorm-entities/base-typeorm.uuid.entity';

export class BaseFilterTypeOrmRepository<
  T extends BaseTypeOrmUuidEntity
> extends BaseTypeOrmRepository<T> {
  constructor(
    repository: Repository<T>,
    private findOptionGenerator: (
      filter: string
    ) => FindOptionsWhere<T> | Array<FindOptionsWhere<T>>
  ) {
    super(repository);
  }

  async findAll(
    skip: number, take: number, filter?: string
  ): Promise<Result<[entities: Array<T>, count: number]>> {
    try {
      const [entities, count] = await this.repository.findAndCount({
        skip,
        take,
        where: filter
          ? this.findOptionGenerator(filter)
          : {},
      });

      return Result.success([entities, count]);
    } catch (error: unknown) {
      return Result.error(RedishError.Infrastructure.databaseError(error));
    }
  }
}
