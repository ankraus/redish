import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../typeorm-entities/user.entity';
import { User as DomainUser, RedishError, Result } from '@redish-backend/domain';
import { Repository } from 'typeorm';
import { UserRepository } from '@redish-backend/usecases';

export class TypeOrmUserRepository extends UserRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {
    super();
  }

  async findAll(): Promise<DomainUser[]> {
    const dbUsers = await this.usersRepository.find();
    return dbUsers as DomainUser[];
  }

  async findOneById(id: string): Promise<Result<DomainUser>> {
    return this.findOneBy({ id: id });
  }

  async findOneByUsername(username: string): Promise<Result<DomainUser>> {
    return this.findOneBy({ username: username });
  }

  async findOneByEmail(email: string): Promise<Result<DomainUser>> {
    return this.findOneBy({ email: email });
  }

  async remove(user: DomainUser): Promise<Result> {
    try {
      await this.usersRepository.remove(user as User);
      return Result.success();
    } catch (error) {
      return Result.error(
        RedishError.Infrastructure.databaseError()
      );
    }
  }

  async save(user: DomainUser): Promise<Result<DomainUser>> {
    try {
      const savedUser = await this.usersRepository.save(user as User);
      return Result.success(savedUser as DomainUser);
    } catch (error) {
      return Result.error(
        RedishError.Infrastructure.databaseError()
      );
    }
  }

  private async findOneBy(where: object): Promise<Result<DomainUser>> {
    const dbUser = await this.usersRepository.findOneBy(where);
    if (dbUser) {
      return Result.success(dbUser as DomainUser);
    }
    return Result.error(RedishError.Infrastructure.notFound());
  }
}
