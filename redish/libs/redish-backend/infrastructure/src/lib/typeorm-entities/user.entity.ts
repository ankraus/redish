import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
import { User as DomainUser } from '@redish-backend/domain';

@Entity()
export class User{
  @PrimaryColumn()
  id: string;

  @Column({unique: true})
  username: string;

  @Column({unique: true})
  email: string;

  @Column()
  pw: string;

  @Column()
  isActive: boolean;

  constructor(id: string, username: string, pw: string, isActive: boolean, email: string){
    this.id = id;
    this.username = username;
    this.pw = pw;
    this.isActive = isActive;
    this.email = email;
  }
  
  public static fromDomainUser(user:DomainUser):User {
    return new User(user.id, user.username, user.pw, user.isActive, user.email);
  }
}