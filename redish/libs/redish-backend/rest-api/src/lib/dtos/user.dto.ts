import { ApiProperty } from '@nestjs/swagger';
import { UserDto as IUserDto } from '@redish-shared/domain';

export class UserDto implements IUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  email?: string;

  constructor(username: string) {
    this.username = username;
  }
}
