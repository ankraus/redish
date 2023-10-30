import { WormGame } from '@redish-games/worm-ui';
import styles from './worm-feature.module.scss';
import { useWormFacade } from '@redish-games/worm-data-access';

/* eslint-disable-next-line */
export interface WormFeatureProps {}

export function WormFeature(props: WormFeatureProps) {
  const { wormGameViewModel } = useWormFacade();

  return (
    <div className={styles['container']}>
      <WormGame
        state={wormGameViewModel.game}
        handleNumberOfCharactersEntered={wormGameViewModel.handleNumberOfCharactersEntered}
        handleCharacterEntered={wormGameViewModel.handleCharacterEntered}
        handleCharacterRemoved={wormGameViewModel.handleCharacterRemoved}
        handleSubmitWord={wormGameViewModel.handleSubmitWord}
      />
    </div>
  );
}

export default WormFeature;
