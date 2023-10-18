import { Game } from '@redish-backend/domain';

export class StartGameSessionCommand {
  constructor(public playerId: string, public game: Game) {}
}
