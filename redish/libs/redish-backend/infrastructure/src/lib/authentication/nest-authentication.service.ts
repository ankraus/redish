import { Injectable } from '@nestjs/common';
import { User as DomainUser, Result } from '@redish-backend/domain';
import { ConfigurationService } from '@redish-backend/shared';
import {
  AuthenticationService,
  UserRepository,
} from '@redish-backend/usecases';
import {
  CreateUserDto,
  UuidDto,
  AuthenticateUserDto,
  TokenDto,
  TokenPayloadDto,
  Role,
  RedishError,
} from '@redish-shared/domain';
import { hash, compare } from 'bcrypt';
import { randomUUID } from 'crypto';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class NestAuthenticationService extends AuthenticationService {
  constructor(
    private userRepository: UserRepository,
    private configService: ConfigurationService
  ) {
    super();
  }

  public async createUser(user: CreateUserDto): Promise<Result<UuidDto>> {
    if (user.password.length === 0) {
      return Result.error(RedishError.Domain.passwordTooShort());
    }

    const usernameResult = await this.userRepository.findOneByUsername(
      user.username
    );

    if (
      usernameResult.error?.code ===
      RedishError.Infrastructure.Codes.DATABASE_ERROR
    ) {
      return Result.error(usernameResult.error);
    }

    if (usernameResult.success) {
      return Result.error(RedishError.Domain.userNameAlreadyExists());
    }

    const emailResult = await this.userRepository.findOneByEmail(user.email);

    if (
      emailResult.error?.code ===
      RedishError.Infrastructure.Codes.DATABASE_ERROR
    ) {
      return Result.error(emailResult.error);
    }

    if (emailResult.success) {
      return Result.error(RedishError.Domain.emailAlreadyExists());
    }

    const pwHash: string = await hash(user.password, 10);
    const id: string = randomUUID();
    const isActive = true;

    const newUser = new DomainUser(
      id,
      user.username,
      user.email,
      pwHash,
      isActive
    );
    try {
      await this.userRepository.save(newUser);
      return Result.success<UuidDto>({ uuid: newUser.id });
    } catch (error) {
      return Result.error(RedishError.Domain.databaseError());
    }
  }

  public async authenticateUser(
    user: AuthenticateUserDto
  ): Promise<Result<TokenDto>> {
    const email = user.email;
    const userResult = await this.userRepository.findOneByEmail(email);

    if (
      userResult.error?.code === RedishError.Infrastructure.Codes.DATABASE_ERROR
    ) {
      return Result.error(userResult.error);
    }

    if (!userResult.success) {
      return Result.error(RedishError.Domain.authenticationError());
    }

    const pwPlain = user.password;
    const pwHash = userResult.result!.pwHash;
    const success = await compare(pwPlain, pwHash);

    if (success) {
      const jwtConfig = this.configService.getJwtConfig();

      const token = sign({ uuid: userResult.result!.id }, jwtConfig.secret, {
        expiresIn: jwtConfig.expiry,
      });

      return Result.success<TokenDto>({token});
    } else {
      return Result.error(RedishError.Domain.authenticationError());
    }
  }

  // todo: the following two methods have a lot of shared code, rework this
  override async verifyAuthenticated(token: string): Promise<Result<UuidDto>> {
    const jwtConfig = this.configService.getJwtConfig();
    try {
      const decodedContent = await verify(token, jwtConfig.secret);
      const payload = decodedContent as TokenPayloadDto;
      return Result.success<UuidDto>({uuid: payload.uuid});
    } catch (error: any) {
      return Result.error(RedishError.Domain.authenticationError());
    }
  }

  override async verifyHasRole(token: string, role: Role): Promise<Result> {
    const jwtConfig = this.configService.getJwtConfig();
    try {
      const decodedContent = await verify(token, jwtConfig.secret);
      const payload = decodedContent as TokenPayloadDto;
      if (payload.roles.includes(role)) {
        return Result.success();
      }
      // todo create more meaningful error
      return Result.error(RedishError.Domain.authenticationError());
    } catch (error: any) {
      return Result.error(RedishError.Domain.authenticationError());
    }
  }
}
