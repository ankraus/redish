export class Game {
  constructor(
    public uuid: string,
    public name: string,
    public minNumberOfPlayers: number,
    public maxNumberOfPlayers: number,
    public previewColor: 'green' | 'redish-light'
  ) {}
}
