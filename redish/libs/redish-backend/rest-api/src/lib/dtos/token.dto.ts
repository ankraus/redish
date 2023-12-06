import { ApiProperty } from '@nestjs/swagger';
import { TokenDto as ITokenDto } from '@redish-shared/domain';

export class TokenDto implements ITokenDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  refreshToken: string;

  constructor(token: string, refreshToken: string) {
    this.token = token;
    this.refreshToken = refreshToken;
  }
}
