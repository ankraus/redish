import { Authentication, Result } from '@redish-backend/domain';
import { CreateUserDTO, UuidDTO } from '@redish-shared/domain';

export abstract class AuthenticationService {
  abstract authenticateUser(user: Authentication): Promise<Result<UuidDTO>>;
  abstract createUser(user: CreateUserDTO): Promise<Result<UuidDTO>>;
}
