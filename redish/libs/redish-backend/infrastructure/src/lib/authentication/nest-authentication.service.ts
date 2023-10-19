import { Injectable } from '@nestjs/common';
import { Authentication, Result } from '@redish-backend/domain';
import { AuthenticationService } from '@redish-backend/usecases';
import { Observable, of } from 'rxjs';

@Injectable()
export class NestAuthenticationService extends AuthenticationService {


  public authenticateUser(user: Authentication): Observable<Result> {
    console.log('Authenticated!');
    return of(Result.success());
  }
}
