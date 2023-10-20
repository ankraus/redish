import {ApiProperty} from "@nestjs/swagger";

export class UuidDTO {

  @ApiProperty()
  uuid: string;

  constructor(uuid: string) {
    this.uuid = uuid;
  }
}