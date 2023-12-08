import { RedishButton } from '@redish-frontend/shared-ui';
import { WormGameViewModel } from '@redish-games/worm-models';
import { useRef } from 'react';
import { ChooseNumber } from './choose-number/choose-number';
import styles from './worm-game.module.scss';
import cn from 'classnames';

const characterRegex = /^[a-zA-Z]$/;

export function WormGame({
  state,
  handleNumberOfCharactersEntered,
  handleCharacterEntered,
  handleCharacterRemoved,
  handleSubmitWord,
  username,
}: Readonly<WormGameViewModel>) {
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
      <h1>Worm</h1>
      {showChooseNumber && (
        <ChooseNumber
          min={5}
          max={35}
          handleChosen={handleNumberOfCharactersEntered}
        />
      )}

      {showGame && (
        <>
          <p>
            Enter a word and submit. Enter another word, starting with the last
            letter of the previous one.
          </p>
          <p>Keep up hope! Stay positive! You are loved!</p>
          <div className={styles.word}>
            {state.word.map((character, index) => (
              <div key={index} className={styles.character}>
                <input
                  className={cn(
                    index < state.currentWordIndex ? styles.disabled : '',
                    index === state.currentWordIndex - 1
                      ? styles.currentFirstLetter
                      : ''
                  )}
                  type="text"
                  maxLength={1}
                  value={character}
                  onKeyUp={(event) => handleKeyUp(event)}
                  readOnly
                  disabled={index < state.currentWordIndex}
                  ref={(node) => (wordRef.current[index] = node)}
                />
              </div>
            ))}
          </div>
          {won ? (
            <h2>You won, {username}!</h2>
          ) : (
            <RedishButton onClick={handleSubmitWord}>Submit Word</RedishButton>
          )}
        </>
      )}
    </div>
  );
}

export default WormGame;
