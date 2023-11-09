import { UpdateUserDto as IUpdateUserDto } from '@redish-shared/domain';

export class UpdateUserDto implements IUpdateUserDto {
  username?: string;
  password?: string;
  email?: string;
}
