import { Inject, Injectable } from '@nestjs/common';
import {
  Result,
  User as DomainUser,
  RedishError,
} from '@redish-backend/domain';
import { AuthenticationService, UserRepository } from '@redish-backend/usecases';
import {
  CreateUserDTO,
  UuidDTO,
  AuthenticateUserDTO,
} from '@redish-shared/domain';
import { hash, compare } from 'bcrypt';
import { randomUUID } from 'crypto';

@Injectable()
export class NestAuthenticationService extends AuthenticationService {
  constructor(
    @Inject(UserRepository)
    private userRepository: UserRepository
  ) {
    super();
  }

  // is this override still needed?
  override async createUser(user: CreateUserDTO): Promise<Result<UuidDTO>> {
    const username = user.username;

    if ((await this.userRepository.findOneByUsername(username)).success) {
      return Result.error(RedishError.Domain.userNameAlreadyExists());
    }

    const email = user.email;

    if ((await this.userRepository.findOneByEmail(email)).success) {
      return Result.error(RedishError.Domain.emailAlreadyExists());
    }

    const pwHash: string = await hash(user.password, 10);
    // we should do a check if the password is empty

    const id: string = randomUUID();
    const isActive = true;

    const newUser = new DomainUser(id, username, email, pwHash, isActive);
    try {
      await this.userRepository.saveDomainUser(newUser);
      return Result.success(new UuidDTO(newUser.id));
    } catch (error) {
      return Result.error(RedishError.Domain.databaseError());
    }
  }

  public async authenticateUser(
    user: AuthenticateUserDTO
  ): Promise<Result<UuidDTO>> {
    const email = user.email;
    const dbUser = (await this.userRepository.findOneByEmail(email)).result;

    if (!dbUser) {
      return Result.error(RedishError.Domain.authenticationError());
    }

    const pwPlain = user.password;
    const pwHash = dbUser.pw;
    const success = await compare(pwPlain, pwHash);

    if (success) {
      return Result.success(new UuidDTO(dbUser.id));
    } else {
      return Result.error(RedishError.Domain.authenticationError());
    }
  }
}
