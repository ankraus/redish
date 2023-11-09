import { RedishButton } from '@redish-frontend/shared-ui';
import { useRef } from 'react';
import styles from './choose-number.module.scss';

type ChooseNumberProps = {
  min: number;
  max: number;
  handleChosen: (number: number) => void;
};

export function ChooseNumber({ min, max, handleChosen }: ChooseNumberProps) {
  const numberRef = useRef<HTMLInputElement | null>(null);

  function handleNumberChosen() {
    if (numberRef.current === null) {
      return;
    }

    const number = Number.parseInt(numberRef.current.value, 10);
    handleChosen(number);
  }

  return (
    <div className={styles.container}>
      <label htmlFor="length">
        Choose the length of the worm - choose wisely!
      </label>
      <div className={styles.userInput}>
        <input
          ref={numberRef}
          type="number"
          id="length"
          min={min}
          max={max}
          placeholder={`${min}-${max}`}
        />
        <RedishButton onClick={() => handleNumberChosen()}>Set</RedishButton>
      </div>
    </div>
  );
}
