import { Result } from '@redish-backend/domain';
import { FilterDto, RedishError } from '@redish-shared/domain';
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
    filterDto: FilterDto
  ): Promise<Result<[entities: Array<T>, count: number]>> {
    try {
      const [entities, count] = await this.repository.findAndCount({
        take: filterDto.take,
        skip: filterDto.skip,
        where: filterDto.filter
          ? this.findOptionGenerator(filterDto.filter)
          : {},
      });

      return Result.success([entities, count]);
    } catch (error: unknown) {
      return Result.error(RedishError.Infrastructure.databaseError(error));
    }
  }
}
