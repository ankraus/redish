import { ApiProperty } from '@nestjs/swagger';
import { CreateGameDto as ICreateGameDto } from '@redish-shared/domain';

export class CreateGameDto implements ICreateGameDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  minNumberOfPlayers: number;
  @ApiProperty()
  maxNumberOfPlayers: number;
  @ApiProperty()
  previewColor: 'green' | 'redish-light';

  constructor(
    name: string,
    minNumberOfPlayers: number,
    maxNumberOfPlayers: number,
    previewColor: 'green' | 'redish-light',
  ) {
    this.name = name;
    this.minNumberOfPlayers = minNumberOfPlayers;
    this.maxNumberOfPlayers = maxNumberOfPlayers;
    this.previewColor = previewColor;
  }
}
