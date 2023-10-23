import { ApiProperty } from '@nestjs/swagger';

export class JwtDTO {
  @ApiProperty()
  jwt: string;

  constructor(jwt: string) {
    this.jwt = jwt;
  }
}
