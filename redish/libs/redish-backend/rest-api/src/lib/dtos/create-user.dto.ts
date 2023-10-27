import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto as ICreateUserDto } from '@redish-shared/domain';

export class CreateUserDto implements ICreateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;

  constructor(username: string, password: string, email: string) {
    this.username = username;
    this.password = password;
    this.email = email;
  }
}
