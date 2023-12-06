import { PreviewColor } from "./preview-color.type";

export interface CreateGameDto {
  readableId: string;
  name: string;
  minNumberOfPlayers: number;
  maxNumberOfPlayers: number;
  previewColor: PreviewColor;
}
