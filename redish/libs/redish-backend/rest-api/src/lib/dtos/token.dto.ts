import { ApiProperty } from '@nestjs/swagger';
import { TokenDto as ITokenDto } from '@redish-shared/domain';

export class TokenDto implements ITokenDto {
  @ApiProperty()
  token: string;

  constructor(token: string) {
    this.token = token;
  }
}
