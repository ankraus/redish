import { WormGameState } from '@redish-games/worm-models';
import { useImmer } from 'use-immer';
import { Result } from '@redish-shared/domain';

/**
 * facade hook as described in https://thomasburlesonia.medium.com/https-medium-com-thomasburlesonia-react-hooks-rxjs-facades-4e116330bbe1
 */
export function useWormFacade(
  verify: (word: string) => Promise<Result<boolean>>,
  toast: (text: string, type: 'error' | 'info') => void
): {
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

  const handleWormGameSubmitWord = async () => {
    const word = wormGame.word.slice(
      Math.max(0, wormGame.currentWordIndex - 1),
      wormGame.currentIndex
    );
    const isWordResult = await verifyWord(word.join(''), verify);
    if (!isWordResult.success) return;

    console.info('verify', word, isWordResult.result);
    if (isWordResult.result) {
      updateWormGame((draft) => {
        draft.currentWordIndex = draft.currentIndex;
      });
    } else {
      toast('Not a word', 'error');
    }
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

async function verifyWord(
  word: string,
  verify: (word: string) => Promise<Result<boolean>>
): Promise<Result<boolean>> {
  if (word.length === 0) return Result.success(false);
  return await verify(word);
}
