import { Injectable } from '@nestjs/common';
import { AuthenticationService } from './interfaces/authentication.service';
import { Authentication, Result } from '@redish-backend/domain';
import { Observable } from 'rxjs';
import { CreateUserDTO, UuidDTO } from '@redish-shared/domain';

@Injectable()
export class AuthenticationFacade {
  constructor(private _authentication: AuthenticationService) {}

  public authenticateUser(user: Authentication): Promise<Result<UuidDTO>> {
    return this._authentication.authenticateUser(user);
  }

  public createUser(user: CreateUserDTO): Promise<Result<UuidDTO>> {
    return this._authentication.createUser(user);
  }
}
