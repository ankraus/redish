import { Authentication, Result } from '@redish-backend/domain';
import { Observable } from 'rxjs';

export abstract class AuthenticationService {
  abstract authenticateUser(user: Authentication): Observable<Result>;
}
