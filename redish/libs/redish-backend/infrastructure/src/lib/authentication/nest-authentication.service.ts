import { Injectable } from '@nestjs/common';
import { Result } from '@redish-backend/domain';
import { AuthenticationService } from '@redish-backend/usecases';
import { randomUUID } from 'crypto';

@Injectable()
export class NestAuthenticationService extends AuthenticationService {
  public async generateUuid(): Promise<Result<string>> {
    return Promise.resolve(Result.success(randomUUID()));
  }
}
