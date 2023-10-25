import { Result } from '@redish-backend/domain';
import {
  AuthenticateUserDto,
  CreateUserDto,
  TokenDto,
  UuidDto,
} from '@redish-shared/domain';

export abstract class AuthenticationService {
  abstract authenticateUser(user: AuthenticateUserDto): Promise<Result<TokenDto>>;
  abstract createUser(user: CreateUserDto): Promise<Result<UuidDto>>;
  abstract verifyAuthenticated(token: string): Promise<Result<UuidDto>>;
}
