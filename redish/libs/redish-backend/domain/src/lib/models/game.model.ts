import { Uuid } from "./uuid.model";

export class Game implements Uuid {
  constructor(
    public uuid: string,
    public name: string,
    public minNumberOfPlayers: number,
    public maxNumberOfPlayers: number,
    public previewColor: 'green' | 'redish-light'
  ) {}
}
