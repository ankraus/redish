import { RedishButton } from '@redish-frontend/shared-ui';
import { WormGameViewModel } from '@redish-games/worm-models';
import { useRef } from 'react';
import { ChooseNumber } from './choose-number/choose-number';
import styles from './worm-game.module.scss';

const characterRegex = /^[a-zA-Z]$/;

export function WormGame({
  state,
  handleNumberOfCharactersEntered,
  handleCharacterEntered,
  handleCharacterRemoved,
  handleSubmitWord,
}: WormGameViewModel) {
  const showChooseNumber = state.word.length === 0;
  const showGame = state.word.length > 0;
  const won = state.currentWordIndex === state.word.length;

  const wordRef = useRef(
    Array.from<HTMLInputElement | null>({ length: state.word.length })
  );

  wordRef.current[state.currentIndex]?.focus();

  function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    console.log('key', event.key);
    console.log('code', event.code);
    console.log('type', event.type);

    if (event.key === 'Backspace' || event.key === 'Delete') {
      wordRef.current[state.currentIndex - 1]?.focus();
      handleCharacterRemoved();
      return;
    }

    if (event.key === 'Enter') {
      handleSubmitWord();
      return;
    }

    if (
      state.currentIndex === state.word.length ||
      !characterRegex.test(event.key)
    ) {
      return;
    }

    handleCharacterEntered(event.key);
  }

  return (
    <div className={styles.container}>
      {showChooseNumber && (
        <ChooseNumber
          min={5}
          max={35}
          handleChosen={handleNumberOfCharactersEntered}
        />
      )}

      {showGame && (
        <>
          <div className={styles.word}>
            {state.word.map((character, index) => (
              <div key={index} className={styles.character}>
                {index < state.currentWordIndex ? (
                  <span>{character}</span>
                ) : (
                  <input
                    type="text"
                    maxLength={1}
                    value={character}
                    onKeyUp={(event) => handleKeyUp(event)}
                    readOnly
                    ref={(node) => (wordRef.current[index] = node)}
                  />
                )}
              </div>
            ))}
          </div>
          {won ? (
            <p>Ye won, Ron!</p>
          ) : (
            <RedishButton onClick={handleSubmitWord}>Submit Word</RedishButton>
          )}
        </>
      )}
    </div>
  );
}

export default WormGame;
