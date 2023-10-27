import { ApiProperty } from '@nestjs/swagger';
import { JwtDto as IJwtDto } from '@redish-shared/domain';

export class JwtDto implements IJwtDto {
  @ApiProperty()
  jwt: string;

  constructor(jwt: string) {
    this.jwt = jwt;
  }
}
