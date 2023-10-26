import { Role } from '@redish-shared/domain';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  pwHash: string;

  @Column()
  isActive: boolean;

  @Column({ type: 'enum', enum: Role, array: true, default: [Role.USER] })
  roles: Role[];

  constructor(
    id: string,
    username: string,
    pwHash: string,
    isActive: boolean,
    email: string,
    roles: Role[]
  ) {
    this.id = id;
    this.username = username;
    this.pwHash = pwHash;
    this.isActive = isActive;
    this.email = email;
    this.roles = roles;
  }
}
