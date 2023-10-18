import { Game } from '@redish-backend/domain';

export class AddGameCommand {
  constructor(public game: Game) {}
}
