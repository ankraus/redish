import { Result } from '@redish-backend/domain';
import {
  AuthenticateUserDto,
  CreateUserDto,
  JwtDto,
  UuidDto,
} from '@redish-shared/domain';

export abstract class AuthenticationService {
  abstract authenticateUser(user: AuthenticateUserDto): Promise<Result<JwtDto>>;
  abstract createUser(user: CreateUserDto): Promise<Result<UuidDto>>;
}
