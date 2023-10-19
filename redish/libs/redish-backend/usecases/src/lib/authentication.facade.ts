import { Injectable } from '@nestjs/common';
import { AuthenticationService } from './interfaces/authentication.service';
import { Authentication, Result } from '@redish-backend/domain';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationFacade {
  constructor(private _authentication: AuthenticationService) {}

  public authenticateUser(user: Authentication): Observable<Result> {
    return this._authentication.authenticateUser(user);
  }
}
