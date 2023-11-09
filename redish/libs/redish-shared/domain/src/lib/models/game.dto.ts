export interface GameDto {
  id: string;
  name: string;
  minNumberOfPlayers: number;
  maxNumberOfPlayers: number;
  previewColor: 'green' | 'redish-light';
}
