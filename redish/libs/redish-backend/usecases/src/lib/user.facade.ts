import { Injectable } from '@nestjs/common';
import { UserService } from './interfaces/user.service';
import { Result } from '@redish-backend/domain';
import {
  AuthenticateUserDto,
  CreateUserDto,
  Role,
  TokenDto,
  UpdateUserDto,
  UserDto,
  UuidDto,
} from '@redish-shared/domain';

@Injectable()
export class UserFacade {
  constructor(private _userService: UserService) {}

  public authenticateUser(
    user: AuthenticateUserDto
  ): Promise<Result<TokenDto>> {
    return this._userService.authenticateUser(user);
  }

  public createUser(user: CreateUserDto): Promise<Result<UuidDto>> {
    return this._userService.createUser(user);
  }

  public verifyToken(token: string): Promise<Result<UuidDto>> {
    return this._userService.verifyAuthenticated(token);
  }

  public verifyAuthenticated(token: string): Promise<Result<UuidDto>> {
    return this._userService.verifyAuthenticated(token);
  }

  public verifyHasRole(token: string, role: Role): Promise<Result> {
    return this._userService.verifyHasRole(token, role);
  }

  public updateUser(
    userId: string,
    user: UpdateUserDto
  ): Promise<Result<UuidDto>> {
    return this._userService.updateUser(userId, user);
  }

  public getUserById(userId: string): Promise<Result<UserDto>> {
    return this._userService.getUserById(userId);
  }
  
  public deleteUser(userId: string): Promise<Result<UuidDto>> {
    return this._userService.deleteUser(userId);
  }
}
