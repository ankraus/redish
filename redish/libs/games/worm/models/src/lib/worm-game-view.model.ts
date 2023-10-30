import { WormGameState } from "./worm-game-state.model";

export interface WormGameViewModel {
  state: WormGameState;

  handleNumberOfCharactersEntered: (numberOfCharacters: number) => void;

  handleCharacterEntered: (character: string) => void;
  handleCharacterRemoved: () => void;

  handleSubmitWord: () => void;
}
