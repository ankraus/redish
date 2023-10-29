import { useGamesFacade } from '@redish-frontend/games-data-access';
import { GamesList } from '@redish-frontend/games-ui';
import { useNavigate } from 'react-router-dom';
import styles from './games-feature.module.scss';

/* eslint-disable-next-line */
export interface GamesFeatureProps {}

export function GamesFeature(props: GamesFeatureProps) {
  const { games } = useGamesFacade();
  const navigate = useNavigate();

  return (
    <div className={styles['container']}>
      <GamesList games={games} handleGameClicked={(route) => navigate(route)} />
    </div>
  );
}
