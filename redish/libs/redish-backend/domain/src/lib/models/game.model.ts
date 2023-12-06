import { PreviewColor } from '@redish-shared/domain';
import { Uuid } from './uuid.model';

export class Game implements Uuid {
  constructor(
    public uuid: string,
    public readableId: string,
    public name: string,
    public minNumberOfPlayers: number,
    public maxNumberOfPlayers: number,
    public previewColor: PreviewColor
  ) {}
}
