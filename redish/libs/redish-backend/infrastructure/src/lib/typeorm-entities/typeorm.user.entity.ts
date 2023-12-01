import { Role } from '@redish-shared/domain';
import { Entity, Column, PrimaryColumn } from 'typeorm';
import { User as DomainUser } from '@redish-backend/domain';

@Entity()
export class User extends DomainUser {
  @PrimaryColumn()
  override uuid: string;

  @Column({ unique: true })
  override username: string;

  @Column({ unique: true })
  override email: string;

  @Column()
  override pwHash: string;

  @Column()
  override isActive: boolean;

  @Column({ type: 'enum', enum: Role, array: true, default: [Role.USER] })
  override roles: Role[];

  constructor(
    uuid: string,
    username: string,
    pwHash: string,
    isActive: boolean,
    email: string,
    roles: Role[]
  ) {
    super(uuid, username, email, pwHash, isActive, roles);
    this.uuid = uuid;
    this.username = username;
    this.pwHash = pwHash;
    this.isActive = isActive;
    this.email = email;
    this.roles = roles;
  }
}
