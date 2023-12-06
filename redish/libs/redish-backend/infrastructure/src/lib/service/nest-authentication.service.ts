import { Injectable } from '@nestjs/common';
import { Result } from '@redish-backend/domain';
import { ConfigurationService } from '@redish-backend/shared';
import { AuthenticationService } from '@redish-backend/usecases';
import { RedishError, Role, UuidDto } from '@redish-shared/domain';
import { compare, hash } from 'bcrypt';
import { randomUUID } from 'crypto';
import { JwtPayload, sign, verify } from 'jsonwebtoken';

@Injectable()
export class NestAuthenticationService extends AuthenticationService {
  constructor(private configService: ConfigurationService) {
    super();
  }

  public async generateUuid(): Promise<Result<string>> {
    return Promise.resolve(Result.success(randomUUID()));
  }

  public async generateHash(data: string): Promise<Result<string>> {
    try {
      return Result.success(await hash(data, 10));
    } catch (error: unknown) {
      return Result.error(
        RedishError.Domain.technicalAuthenticationError(error)
      );
    }
  }

  public async validatePassword(
    password: string,
    hash: string
  ): Promise<Result<boolean>> {
    try {
      return Result.success(await compare(password, hash));
    } catch (error: unknown) {
      return Result.error(
        RedishError.Domain.technicalAuthenticationError(error)
      );
    }
  }

  public async createToken(
    payload: string | object | Buffer
  ): Promise<Result<string>> {
    const jwtConfig = this.configService.getJwtConfig();

    try {
      return Result.success(
        sign(payload, jwtConfig.secret, {
          expiresIn: jwtConfig.expiry,
        })
      );
    } catch (error: unknown) {
      return Result.error(
        RedishError.Domain.technicalAuthenticationError(error)
      );
    }
  }

  public async verifyAuthenticated(token: string): Promise<Result<UuidDto>> {
    const payloadResult = await this.readToken(token);
    if (payloadResult.error) {
      return Result.error(payloadResult.error);
    }

    return Result.success<UuidDto>({ uuid: payloadResult.result!['uuid'] });
  }

  public async verifyHasRole(token: string, role: Role): Promise<Result> {
    const payload = await this.readToken(token);
    if (payload.error) {
      return Result.error(payload.error);
    }

    if (payload.result!['roles'].includes(role)) {
      return Result.success();
    } else {
      return Result.error(RedishError.Domain.authenticationError());
    }
  }

  private async readToken(token: string): Promise<Result<JwtPayload>> {
    const jwtConfig = this.configService.getJwtConfig();
    try {
      return Result.success(verify(token, jwtConfig.secret) as JwtPayload);
    } catch (error: unknown) {
      return Result.error(RedishError.Domain.authenticationError(error));
    }
  }
}
