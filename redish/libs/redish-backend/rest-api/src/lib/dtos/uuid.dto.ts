import { ApiProperty } from '@nestjs/swagger';
import { UuidDto as IUuidDto } from '@redish-shared/domain';

export class UuidDto implements IUuidDto {
  @ApiProperty()
  uuid: string;

  constructor(uuid: string) {
    this.uuid = uuid;
  }
}
