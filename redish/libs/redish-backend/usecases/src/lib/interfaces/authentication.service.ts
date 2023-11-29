import { Result } from '@redish-backend/domain';

export abstract class AuthenticationService {
  abstract generateUuid(): Promise<Result<string>>;
}
