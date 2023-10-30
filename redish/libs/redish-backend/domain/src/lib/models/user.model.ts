import { Role } from '@redish-shared/domain';

export class User {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public pwHash: string,
    public isActive: boolean = true,
    public roles: Role[] = [Role.USER]
  ) {}
}
