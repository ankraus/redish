import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../typeorm-entities/typeorm.user.entity';
import { User as DomainUser, Result } from '@redish-backend/domain';
import { Repository } from 'typeorm';
import { UserRepository } from '@redish-backend/usecases';
import { BaseTypeOrmRepository } from './base-typeorm.repository';

export class TypeOrmUserRepository
  extends BaseTypeOrmRepository<DomainUser>
  implements UserRepository
{
  constructor(
    @InjectRepository(User)
    usersRepository: Repository<User>
  ) {
    super(usersRepository);
  }

  async findOneByUsername(username: string): Promise<Result<DomainUser>> {
    return this.findOneBy({ username: username });
  }

  async findOneByEmail(email: string): Promise<Result<DomainUser>> {
    return this.findOneBy({ email: email });
  }
}
