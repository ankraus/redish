import { PreviewColor } from '@redish-shared/domain';

export interface GameViewModel {
  id: string;
  name: string;
  module: string;
  route: string;
  previewImages: { small: string; large: string };
  previewColor: PreviewColor;
  minNumberOfPlayers: number;
  maxNumberOfPlayers: number;
}
