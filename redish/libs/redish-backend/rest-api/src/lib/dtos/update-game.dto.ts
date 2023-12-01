import { ApiProperty } from '@nestjs/swagger';
import { UpdateGameDto as IUpdateGameDto } from '@redish-shared/domain';

export class UpdateGameDto implements IUpdateGameDto {
  @ApiProperty()
  uuid: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  minNumberOfPlayers: number;
  @ApiProperty()
  maxNumberOfPlayers: number;
  @ApiProperty()
  previewColor: 'green' | 'redish-light';

  constructor(
    uuid: string,
    name: string,
    minNumberOfPlayers: number,
    maxNumberOfPlayers: number,
    previewColor: 'green' | 'redish-light',
  ) {
    this.uuid = uuid;
    this.name = name;
    this.minNumberOfPlayers = minNumberOfPlayers;
    this.maxNumberOfPlayers = maxNumberOfPlayers;
    this.previewColor = previewColor;
  }
}
