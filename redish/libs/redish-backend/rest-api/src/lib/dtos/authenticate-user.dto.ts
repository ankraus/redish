import { ApiProperty } from '@nestjs/swagger';
import { AuthenticateUserDto as IAuthenticateUserDto } from '@redish-shared/domain';

export class AuthenticateUserDto implements IAuthenticateUserDto {
  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;

  constructor(password: string, email: string) {
    this.password = password;
    this.email = email;
  }
}
