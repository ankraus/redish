import { Role } from './role.model';

export class TokenPayloadDto {
  uuid: string;

  roles: Role[];

  constructor(uuid: string, roles: Role[]) {
    this.uuid = uuid;
    this.roles = roles;
  }
}
