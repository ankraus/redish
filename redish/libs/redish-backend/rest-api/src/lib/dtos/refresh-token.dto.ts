import { ApiProperty } from '@nestjs/swagger';
import { RefreshTokenDto as IRefreshTokenDto } from '@redish-shared/domain';

export class RefreshTokenDto implements IRefreshTokenDto {
  @ApiProperty()
  refreshToken: string;

  constructor(refreshToken: string) {
    this.refreshToken = refreshToken;
  }
}
