export interface GameDto {
  id: string;
  name: string;
  minNumberOfPlayers: number;
  maxNumberOfPlayers: number;
  previewImages: { small: string; large: string };
  previewColor: 'green' | 'redish-light';
}
