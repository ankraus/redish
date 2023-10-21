import { Inject, Injectable } from '@nestjs/common';
import {
  Result,
  User as DomainUser,
  RedishError,
} from '@redish-backend/domain';
import {
  AuthenticationService,
  UserRepository,
} from '@redish-backend/usecases';
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

  public async createUser(user: CreateUserDTO): Promise<Result<UuidDTO>> {
    if (user.password.length === 0) {
      return Result.error(RedishError.Domain.passwordTooShort());
    }

    const usernameResult = await this.userRepository.findOneByUsername(
      user.username
    );

    if (
      usernameResult.error?.code ===
      RedishError.Infrastructure.Codes.DATABASE_ERROR
    ) {
      return Result.error(usernameResult.error);
    }

    if (usernameResult.success) {
      return Result.error(RedishError.Domain.userNameAlreadyExists());
    }

    const emailResult = await this.userRepository.findOneByEmail(user.email);

    if (
      emailResult.error?.code ===
      RedishError.Infrastructure.Codes.DATABASE_ERROR
    ) {
      return Result.error(emailResult.error);
    }

    if (emailResult.success) {
      return Result.error(RedishError.Domain.emailAlreadyExists());
    }

    const pwHash: string = await hash(user.password, 10);
    const id: string = randomUUID();
    const isActive = true;

    const newUser = new DomainUser(
      id,
      user.username,
      user.email,
      pwHash,
      isActive
    );
    try {
      await this.userRepository.save(newUser);
      return Result.success(new UuidDTO(newUser.id));
    } catch (error) {
      return Result.error(RedishError.Domain.databaseError());
    }
  }

  public async authenticateUser(
    user: AuthenticateUserDTO
  ): Promise<Result<UuidDTO>> {
    const email = user.email;
    const userResult = await this.userRepository.findOneByEmail(email);

    if (
      userResult.error?.code === RedishError.Infrastructure.Codes.DATABASE_ERROR
    ) {
      return Result.error(userResult.error);
    }

    if (!userResult.success) {
      return Result.error(RedishError.Domain.authenticationError());
    }

    const pwPlain = user.password;
    const pwHash = userResult.result!.pwHash;
    const success = await compare(pwPlain, pwHash);

    if (success) {
      return Result.success(new UuidDTO(userResult.result!.id));
    } else {
      return Result.error(RedishError.Domain.authenticationError());
    }
  }
}
