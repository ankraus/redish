import { InjectRepository } from '@nestjs/typeorm';
import { Game as DomainGame, Result } from '@redish-backend/domain';
import { FilterDto, RedishError } from '@redish-shared/domain';
import { Like, Repository } from 'typeorm';
import { Game } from '../typeorm-entities/typeorm.game.entity';
import { BaseTypeOrmRepository } from './base-typeorm.repository';
import { GameRepository } from '@redish-backend/usecases';

export class TypeOrmGameRepository
  extends BaseTypeOrmRepository<DomainGame>
  implements GameRepository
{
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>
  ) {
    super(gameRepository);
  }

  async findAll(
    filterDto: FilterDto
  ): Promise<Result<[entities: Array<DomainGame>, count: number]>> {
    try {
      const [entities, count] = await this.gameRepository.findAndCount({
        take: filterDto.take,
        skip: filterDto.skip,
        where: filterDto.filter ? { name: Like(`%${filterDto.filter}%`) } : {},
      });

      return Result.success([entities, count]);
    } catch (error: unknown) {
      return Result.error(RedishError.Infrastructure.databaseError(error));
    }
  }
}
