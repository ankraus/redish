import { ApiProperty } from '@nestjs/swagger';
import { GameDto as IGameDto } from '@redish-shared/domain';

export class GameDto implements IGameDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  minNumberOfPlayers: number;
  @ApiProperty()
  maxNumberOfPlayers: number;
  @ApiProperty()
  previewColor: 'green' | 'redish-light';

  constructor(
    id: string,
    name: string,
    minNumberOfPlayers: number,
    maxNumberOfPlayers: number,
    previewColor: 'green' | 'redish-light',
  ) {
    this.id = id;
    this.name = name;
    this.minNumberOfPlayers = minNumberOfPlayers;
    this.maxNumberOfPlayers = maxNumberOfPlayers;
    this.previewColor = previewColor;
  }
}
