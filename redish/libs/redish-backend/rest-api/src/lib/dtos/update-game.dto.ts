import { ApiProperty } from '@nestjs/swagger';
import { UpdateGameDto as IUpdateGameDto, PreviewColor } from '@redish-shared/domain';

export class UpdateGameDto implements IUpdateGameDto {
  @ApiProperty()
  uuid: string;
  @ApiProperty()
  readableId: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  minNumberOfPlayers: number;
  @ApiProperty()
  maxNumberOfPlayers: number;
  @ApiProperty()
  previewColor: PreviewColor;

  constructor(
    uuid: string,
    readableId: string,
    name: string,
    minNumberOfPlayers: number,
    maxNumberOfPlayers: number,
    previewColor: PreviewColor,
  ) {
    this.uuid = uuid;
    this.readableId = readableId;
    this.name = name;
    this.minNumberOfPlayers = minNumberOfPlayers;
    this.maxNumberOfPlayers = maxNumberOfPlayers;
    this.previewColor = previewColor;
  }
}
