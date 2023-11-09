import { WormGame } from '@redish-games/worm-ui';
import styles from './worm-feature.module.scss';
import { useWormFacade } from '@redish-games/worm-data-access';

export interface WormFeatureProps {
  username: string;
}

export function WormFeature(props: Readonly<WormFeatureProps>) {
  const { wormGameViewModel } = useWormFacade();

  return (
    <div className={styles['container']}>
      <WormGame
        state={wormGameViewModel.game}
        handleNumberOfCharactersEntered={
          wormGameViewModel.handleNumberOfCharactersEntered
        }
        handleCharacterEntered={wormGameViewModel.handleCharacterEntered}
        handleCharacterRemoved={wormGameViewModel.handleCharacterRemoved}
        handleSubmitWord={wormGameViewModel.handleSubmitWord}
        username={props.username}
      />
    </div>
  );
}

export default WormFeature;
