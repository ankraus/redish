// implemented using:
// https://medium.com/@bhanushaliyash2000/implementing-an-auth-guard-with-jwt-tokens-in-nest-js-92176a9c3457
// https://docs.nestjs.com/guards

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthenticationService } from '@redish-backend/usecases';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authenticationService: AuthenticationService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    if (!authorization || authorization.trim() === '') {
      return false;
    }
    const token = authorization.replace(/bearer/gim, '').trim();
    const result = await this.authenticationService.verifyAuthenticated(token);
    if (result.success) {
      request.userId = result;
      return true;
    }
    return false;
  }
}
