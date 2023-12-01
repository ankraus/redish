import { Result } from '@redish-backend/domain';
import { Role, UuidDto } from '@redish-shared/domain';

export abstract class AuthenticationService {
  abstract generateUuid(): Promise<Result<string>>;

  abstract generateHash(data: string): Promise<Result<string>>;

  abstract validatePassword(
    password: string,
    hash: string
  ): Promise<Result<boolean>>;

  abstract createToken(
    payload: string | object | Buffer
  ): Promise<Result<string>>;

  abstract verifyAuthenticated(token: string): Promise<Result<UuidDto>>;

  abstract verifyHasRole(token: string, role: Role): Promise<Result>;
}
