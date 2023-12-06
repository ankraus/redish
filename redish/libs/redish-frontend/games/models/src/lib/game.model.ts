import { PreviewColor } from '@redish-shared/domain';

export interface Game {
  uuid: string;
  readableId: string;
  name: string;
  minNumberOfPlayers: number;
  maxNumberOfPlayers: number;
  previewColor: PreviewColor;
}
