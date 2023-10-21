import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../typeorm-entities/user.entity';
import { User as DomainUser } from '@redish-backend/domain';
import { Repository } from 'typeorm';

export class UserRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id: id });
  }

  findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username: username });
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email: email });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async save(user: User): Promise<void> {
    await this.usersRepository.save(user);
  }

  async saveDomainUser(user: DomainUser): Promise<void> {
    await this.save(User.fromDomainUser(user));
  }
}
