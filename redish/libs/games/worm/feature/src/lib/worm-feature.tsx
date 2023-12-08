import { WormGame } from '@redish-games/worm-ui';
import styles from './worm-feature.module.scss';
import { useWormFacade } from '@redish-games/worm-data-access';
import { Result } from '@redish-shared/domain';

export interface WormFeatureProps {
  username: string;
  verify: (word: string) => Promise<Result<boolean>>;
  toast: (text: string, type: 'error' | 'info') => void;
}

export function WormFeature(props: Readonly<WormFeatureProps>) {
  const { wormGameViewModel } = useWormFacade(props.verify, props.toast);

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
