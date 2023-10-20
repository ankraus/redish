import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDTO {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;

  constructor(username: string, password: string, email: string){
    this.username = username;
    this.password = password;
    this.email = email;
  }
}