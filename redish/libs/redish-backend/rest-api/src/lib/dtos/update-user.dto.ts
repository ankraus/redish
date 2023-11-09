import { ApiProperty } from '@nestjs/swagger';
import { UpdateUserDto as IUpdateUserDto } from '@redish-shared/domain';

export class UpdateUserDto implements IUpdateUserDto {
  @ApiProperty()
  username?: string;
  @ApiProperty()
  password?: string;
  @ApiProperty()
  email?: string;
}
