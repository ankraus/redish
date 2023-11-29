export interface CreateGameDto {
  name: string;
  minNumberOfPlayers: number;
  maxNumberOfPlayers: number;
  previewColor: 'green' | 'redish-light';
}
