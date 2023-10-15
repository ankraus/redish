import { ApiProperty } from '@nestjs/swagger';
import { IGame } from '@redish-shared/domain';

export class GameReadDto implements IGame {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  minNumberOfPlayers: number;
  @ApiProperty()
  maxNumberOfPlayers: number;

  constructor(
    id: string,
    name: string,
    minNumberOfPlayers: number,
    maxNumberOfPlayers: number
  ) {
    this.id = id;
    this.name = name;
    this.minNumberOfPlayers = minNumberOfPlayers;
    this.maxNumberOfPlayers = maxNumberOfPlayers;
  }
}
