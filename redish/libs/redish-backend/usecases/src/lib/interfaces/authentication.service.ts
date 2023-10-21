import { Result } from '@redish-backend/domain';
import {
  AuthenticateUserDTO,
  CreateUserDTO,
  UuidDTO,
} from '@redish-shared/domain';

export abstract class AuthenticationService {
  abstract authenticateUser(
    user: AuthenticateUserDTO
  ): Promise<Result<UuidDTO>>;
  abstract createUser(user: CreateUserDTO): Promise<Result<UuidDTO>>;
}
