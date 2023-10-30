import { Injectable } from '@nestjs/common';
import { AuthenticationService } from './interfaces/authentication.service';
import { Result } from '@redish-backend/domain';
import {
  AuthenticateUserDto,
  CreateUserDto,
  Role,
  TokenDto,
  UpdateUserDto,
  UuidDto,
} from '@redish-shared/domain';

@Injectable()
export class AuthenticationFacade {
  constructor(private _authentication: AuthenticationService) {}

  public authenticateUser(user: AuthenticateUserDto): Promise<Result<TokenDto>> {
    return this._authentication.authenticateUser(user);
  }

  public createUser(user: CreateUserDto): Promise<Result<UuidDto>> {
    return this._authentication.createUser(user);
  }

  public verifyToken(token: string): Promise<Result<UuidDto>> {
    return this._authentication.verifyAuthenticated(token);
  }

  public verifyAuthenticated(token: string): Promise<Result<UuidDto>> {
    return this._authentication.verifyAuthenticated(token);
  }

  public verifyHasRole(token: string, role: Role): Promise<Result> {
    return this._authentication.verifyHasRole(token, role);
  }

  public updateUser(userId: string, user: UpdateUserDto): Promise<Result<UuidDto>> {
    return this._authentication.updateUser(userId, user);
  }
}
