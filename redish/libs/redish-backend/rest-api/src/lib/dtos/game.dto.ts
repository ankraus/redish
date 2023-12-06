import { ApiProperty } from '@nestjs/swagger';
import { GameDto as IGameDto, PreviewColor } from '@redish-shared/domain';
import { CreateGameDto } from './create-game.dto';

export class GameDto extends CreateGameDto implements IGameDto {
  @ApiProperty()
  uuid: string;

  constructor(
    readableId: string,
    uuid: string,
    name: string,
    minNumberOfPlayers: number,
    maxNumberOfPlayers: number,
    previewColor: PreviewColor
  ) {
    super(
      readableId,
      name,
      minNumberOfPlayers,
      maxNumberOfPlayers,
      previewColor
    );
    this.uuid = uuid;
  }
}
