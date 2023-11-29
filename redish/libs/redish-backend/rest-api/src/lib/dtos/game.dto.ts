import { ApiProperty } from '@nestjs/swagger';
import { GameDto as IGameDto } from '@redish-shared/domain';
import { CreateGameDto } from './create-game.dto';

export class GameDto extends CreateGameDto implements IGameDto {
  @ApiProperty()
  uuid: string;

  constructor(
    uuid: string,
    name: string,
    minNumberOfPlayers: number,
    maxNumberOfPlayers: number,
    previewColor: 'green' | 'redish-light'
  ) {
    super(name, minNumberOfPlayers, maxNumberOfPlayers, previewColor);
    this.uuid = uuid;
  }
}
