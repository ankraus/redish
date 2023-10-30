import { WormGameState } from '@redish-games/worm-models';
import { useImmer } from 'use-immer';

/**
 * facade hook as described in https://thomasburlesonia.medium.com/https-medium-com-thomasburlesonia-react-hooks-rxjs-facades-4e116330bbe1
 */
export function useWormFacade(): {
  wormGameViewModel: {
    game: WormGameState;
    handleNumberOfCharactersEntered: (numberOfCharacters: number) => void;
    handleCharacterEntered: (character: string) => void;
    handleCharacterRemoved: () => void;
    handleSubmitWord: () => void;
  };
} {
  /**
   * GAME
   */
  const initialGame: WormGameState = {
    word: [],
    currentIndex: 0,
    currentWordIndex: -1,
  };

  const [wormGame, updateWormGame] = useImmer<WormGameState>(initialGame);

  const handleWormGameNumberOfCharactersEntered = (
    numberOfCharacters: number
  ) => {
    updateWormGame((draft) => {
      draft.word = Array.from({ length: numberOfCharacters }, () => '');
    });
  };

  const handleWormGameCharacterEntered = (character: string) => {
    updateWormGame((draft) => {
      draft.word[draft.currentIndex++] = character;
    });
  };

  const handleWormGameCharacterRemoved = () => {
    updateWormGame((draft) => {
      draft.word[draft.currentIndex--] = '';
    });
  };

  const handleWormGameSubmitWord = () => {
    updateWormGame((draft) => {
      draft.currentWordIndex = draft.currentIndex;
    });
  };

  return {
    wormGameViewModel: {
      game: wormGame,
      handleNumberOfCharactersEntered: handleWormGameNumberOfCharactersEntered,
      handleCharacterEntered: handleWormGameCharacterEntered,
      handleCharacterRemoved: handleWormGameCharacterRemoved,
      handleSubmitWord: handleWormGameSubmitWord,
    },
  };
}
