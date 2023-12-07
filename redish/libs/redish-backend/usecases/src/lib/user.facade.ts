import { Injectable } from '@nestjs/common';
import { Result, User } from '@redish-backend/domain';
import {
  AuthenticateUserDto,
  CreateUserDto,
  InternalTokenDto,
  RedishError,
  UpdateUserDto,
  UserDto,
  UuidDto,
} from '@redish-shared/domain';
import { AuthenticationService } from './interfaces/authentication.service';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserFacade {
  constructor(
    private userRepository: UserRepository,
    private authenticationService: AuthenticationService
  ) {}

  public async authenticateUser(
    user: AuthenticateUserDto
  ): Promise<Result<InternalTokenDto>> {
    const userResult = await this.userRepository.findOneByEmail(user.email);

    if (
      userResult.error?.code === RedishError.Infrastructure.Codes.DATABASE_ERROR
    ) {
      return Result.error(userResult.error);
    }

    if (!userResult.success) {
      return Result.error(RedishError.Domain.authenticationError());
    }

    const validationResult = await this.authenticationService.validatePassword(
      user.password,
      userResult.result!.pwHash
    );

    if (
      validationResult.error?.code ===
      RedishError.Domain.Codes.TECHNICAL_AUTHENTICATION_ERROR
    ) {
      return Result.error(validationResult.error);
    }

    if (!validationResult.result!) {
      return Result.error(RedishError.Domain.authenticationError());
    }

    const tokenResult = await this.authenticationService.createAccessToken({
      uuid: userResult.result!.uuid,
    });

    const refreshTokenResult =
      await this.authenticationService.createRefreshToken({
        uuid: userResult.result!.uuid,
      });

    if (tokenResult.error != null) {
      return Result.error(tokenResult.error);
    }

    if (refreshTokenResult.error != null) {
      return Result.error(refreshTokenResult.error);
    }

    return Result.success({
      token: tokenResult.result!,
      refreshToken: refreshTokenResult.result!,
    });
  }

  public async refreshToken(refreshToken: string): Promise<Result<InternalTokenDto>>{
    const authenticationResult = await this.authenticationService.verifyAuthenticated(refreshToken);

    if(authenticationResult.error){
      return Result.error(authenticationResult.error);
    }

    const tokenResult = await this.authenticationService.createAccessToken({
      uuid: authenticationResult.result!.uuid,
    });

    const refreshTokenResult =
      await this.authenticationService.createRefreshToken({
        uuid: authenticationResult.result!.uuid,
      });

    if (tokenResult.error != null) {
      return Result.error(tokenResult.error);
    }

    if (refreshTokenResult.error != null) {
      return Result.error(refreshTokenResult.error);
    }

    return Result.success({
      token: tokenResult.result!,
      refreshToken: refreshTokenResult.result!,
    });
  }

  public async createUser(user: CreateUserDto): Promise<Result<UuidDto>> {
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

    const pwHashResult = await this.authenticationService.generateHash(
      user.password
    );

    if (pwHashResult.error) {
      return Result.error(pwHashResult.error);
    }

    const uuidResult = await this.authenticationService.generateUuid();

    if (uuidResult.error) {
      return Result.error(uuidResult.error);
    }

    const newUser = new User(
      uuidResult.result!,
      user.username,
      user.email,
      pwHashResult.result!
    );
    try {
      await this.userRepository.save(newUser);
      return Result.success<UuidDto>({ uuid: newUser.uuid });
    } catch (error: unknown) {
      return Result.error(RedishError.Domain.databaseError(error));
    }
  }

  public async updateUser(
    userId: string,
    user: UpdateUserDto
  ): Promise<Result<UuidDto>> {
    const currentUserResult = await this.userRepository.findOneById(userId);

    if (currentUserResult.error) {
      // database error because all authenticated users are assumed to exist in the database
      return Result.error(currentUserResult.error);
    }
    const currentUser = currentUserResult.result!;

    let updatedPwHash: string | undefined;
    if (user.password) {
      // only create pw hash if new password has been sent
      const newHashResult = await this.authenticationService.generateHash(
        user.password
      );

      if (newHashResult.error) {
        return Result.error(newHashResult.error);
      }

      updatedPwHash = newHashResult.result!;
    }

    const updatedUser = new User(
      currentUser.uuid,
      user.username ?? currentUser.username,
      user.email ?? currentUser.email,
      updatedPwHash ?? currentUser.pwHash,
      currentUser.isActive,
      currentUser.roles
    );

    const saveResult = await this.userRepository.save(updatedUser);
    if (saveResult.error) {
      return Result.error(saveResult.error);
    }

    return Result.success<UuidDto>({ uuid: saveResult.result! });
  }

  public async getUserById(userId: string): Promise<Result<UserDto>> {
    const userResult = await this.userRepository.findOneById(userId);
    if (userResult.error) {
      return userResult;
    }

    const user = userResult.result!;
    const userDto: UserDto = { username: user.username, email: user.email };
    return Result.success(userDto);
  }

  public async deleteUser(userId: string): Promise<Result<UuidDto>> {
    const removeResult = await this.userRepository.remove(userId);
    if (removeResult.error) {
      return Result.error(removeResult.error);
    }

    return Result.success<UuidDto>({ uuid: userId });
  }
}
