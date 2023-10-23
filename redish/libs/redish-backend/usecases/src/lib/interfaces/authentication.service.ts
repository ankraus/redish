import { Result } from '@redish-backend/domain';
import {
  AuthenticateUserDTO,
  CreateUserDTO,
  JwtDTO,
  UuidDTO,
} from '@redish-shared/domain';

export abstract class AuthenticationService {
  abstract authenticateUser(user: AuthenticateUserDTO): Promise<Result<JwtDTO>>;
  abstract createUser(user: CreateUserDTO): Promise<Result<UuidDTO>>;
}
