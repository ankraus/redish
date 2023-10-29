import { GamesListViewModel } from '@redish-frontend/games-models';
import { RedishCard, breakpoints } from '@redish-frontend/shared-ui';
import cn from 'classnames';
import styles from './games-list.module.scss';

export function GamesList({ games, handleGameClicked }: GamesListViewModel) {
  return (
    <div className={styles.container}>
      {games.map((game) => (
        <div
          key={game.name}
          className={cn(styles.game, styles[game.previewColor])}
          tabIndex={0}
          onClick={(event) => {
            event.preventDefault();
            handleGameClicked(game.route);
          }}
        >
          <RedishCard>
            <h2>{game.name}</h2>
            <picture>
              <source
                srcSet={game.previewImages.large}
                media={`(min-width: ${breakpoints.small})`}
              />
              <img src={game.previewImages.small} alt={game.name} />
            </picture>
          </RedishCard>
        </div>
      ))}
    </div>
  );
}

export default GamesList;
