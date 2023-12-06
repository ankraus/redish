import { ApiProperty } from '@nestjs/swagger';
import {
  CreateGameDto as ICreateGameDto,
  PreviewColor,
  previewColorValues,
} from '@redish-shared/domain';

export class CreateGameDto implements ICreateGameDto {
  @ApiProperty()
  readableId: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  minNumberOfPlayers: number;
  @ApiProperty()
  maxNumberOfPlayers: number;
  @ApiProperty({ enum: previewColorValues })
  previewColor: PreviewColor;

  constructor(
    readableId: string,
    name: string,
    minNumberOfPlayers: number,
    maxNumberOfPlayers: number,
    previewColor: PreviewColor
  ) {
    this.readableId = readableId;
    this.name = name;
    this.minNumberOfPlayers = minNumberOfPlayers;
    this.maxNumberOfPlayers = maxNumberOfPlayers;
    this.previewColor = previewColor;
  }
}
