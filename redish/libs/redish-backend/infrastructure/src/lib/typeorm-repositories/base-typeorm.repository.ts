import { Result } from '@redish-backend/domain';
import { BaseRepository } from '@redish-backend/usecases';
import { RedishError } from '@redish-shared/domain';
import { Repository } from 'typeorm';
import { BaseTypeOrmUuidEntity } from '../typeorm-entities/base-typeorm.uuid.entity';

export class BaseTypeOrmRepository<
  T extends BaseTypeOrmUuidEntity
> extends BaseRepository<T> {
  constructor(private repository: Repository<T>) {
    super();
  }

  async findOneById(uuid: string): Promise<Result<T>> {
    return this.findOneBy({ uuid: uuid });
  }

  async remove(uuid: string): Promise<Result> {
    try {
      const entityResult = await this.findOneById(uuid);
      if (entityResult.error) {
        return Result.error(entityResult.error);
      }
      await this.repository.remove(entityResult.result!);
      return Result.success();
    } catch (error: unknown) {
      return Result.error(RedishError.Infrastructure.databaseError(error));
    }
  }

  async save(entity: T): Promise<Result<string>> {
    try {
      const savedEntity = await this.repository.save(entity);
      return Result.success(savedEntity.uuid);
    } catch (error: unknown) {
      return Result.error(RedishError.Infrastructure.databaseError(error));
    }
  }

  protected async findOneBy(where: object): Promise<Result<T>> {
    try {
      const entity = await this.repository.findOneBy(where);
      if (entity) {
        return Result.success(entity);
      }
      return Result.error(RedishError.Infrastructure.notFound());
    } catch (error: unknown) {
      return Result.error(RedishError.Infrastructure.databaseError(error));
    }
  }
}
