import { Injectable } from '@nestjs/common';
import { AuthenticationService } from './interfaces/authentication.service';
import { Result } from '@redish-backend/domain';
import {
  AuthenticateUserDto,
  CreateUserDto,
  JwtDto,
  UuidDto,
} from '@redish-shared/domain';

@Injectable()
export class AuthenticationFacade {
  constructor(private _authentication: AuthenticationService) {}

  public authenticateUser(user: AuthenticateUserDto): Promise<Result<JwtDto>> {
    return this._authentication.authenticateUser(user);
  }

  public createUser(user: CreateUserDto): Promise<Result<UuidDto>> {
    return this._authentication.createUser(user);
  }
}
