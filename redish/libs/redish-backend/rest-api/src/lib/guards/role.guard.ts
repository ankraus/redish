import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthenticationFacade } from '@redish-backend/usecases';
import { Roles } from '../decorators/roles.decorator';

export class AnyRoleGuard implements CanActivate {
  constructor(
    private readonly authenticationFacade: AuthenticationFacade,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    if (!authorization || authorization.trim() === '') {
      return false;
    }
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    const token = authorization.replace(/bearer/gim, '').trim();

    // check if the user has any of the specified roles
    for (const role of roles) {
      const result = await this.authenticationFacade.verifyHasRole(
        token,
        role
      );
      if (result.success) {
        return true;
      }
    }
    return false;
  }
}
