import { GamesListViewModel } from '@redish-frontend/games-models';
import { RedishCard, breakpoints } from '@redish-frontend/shared-ui';
import cn from 'classnames';
import styles from './games-list.module.scss';
import { SyntheticEvent } from 'react';

export function GamesList({ games, handleGameClicked }: Readonly<GamesListViewModel>) {
  const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.stopPropagation();
    const img = e.target as HTMLImageElement;
    img.onerror = null;
    img.src = 'assets/games/dice/dice-400x400.png';
    const l = img.parentElement?.lastChild;
    if (l) {
      img.parentElement?.replaceChildren(l);
    }
  };

  if (games.length === 0) {
    return <h1 className={styles.noGames}>No games found.</h1>;
  }

  return (
    <div className={styles.container}>
      {games.map((game) => (
        <div
          key={game.id}
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
              <source srcSet={game.previewImages.small} />
              <img
                src={game.previewImages.large}
                alt={game.name}
                onError={handleImageError}
              />
            </picture>
          </RedishCard>
        </div>
      ))}
    </div>
  );
}

export default GamesList;
