import { Result, User } from '@redish-backend/domain';
import { BaseRepository } from './base.repository';

export abstract class UserRepository extends BaseRepository<User> {
  abstract findOneByUsername(username: string): Promise<Result<User>>;

  abstract findOneByEmail(email: string): Promise<Result<User>>;

  abstract saveDomainUser(user: User): Promise<void>;
}
