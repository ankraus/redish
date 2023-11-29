import { Role } from '@redish-shared/domain';
import { Uuid } from './uuid.model';

export class User implements Uuid {
  constructor(
    public uuid: string,
    public username: string,
    public email: string,
    public pwHash: string,
    public isActive: boolean = true,
    public roles: Role[] = [Role.USER]
  ) {}
}
