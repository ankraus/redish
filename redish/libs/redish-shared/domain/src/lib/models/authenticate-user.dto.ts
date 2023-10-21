import { ApiProperty } from '@nestjs/swagger';

export class AuthenticateUserDTO {
  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;

  constructor(password: string, email: string) {
    this.password = password;
    this.email = email;
  }
}
