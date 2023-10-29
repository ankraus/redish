import { GameViewModel } from '@redish-frontend/games-models';

/**
 * facade hook as described in https://thomasburlesonia.medium.com/https-medium-com-thomasburlesonia-react-hooks-rxjs-facades-4e116330bbe1
 */
export function useGamesFacade(): {
  games: Array<GameViewModel>;
} {
  /**
   * GAMES
   */
  const games: Array<GameViewModel> = [
    {
      name: 'Worm',
      previewImages: {
        small: 'assets/games/worm/worm-200x200.png',
        large: 'assets/games/worm/worm-400x400.png',
      },
      route: '/games/worm',
      previewColor: 'green',
    },
    {
      name: 'Worm 1',
      previewImages: {
        small: 'assets/games/worm/worm-200x200.png',
        large: 'assets/games/worm/worm-400x400.png',
      },
      route: '/games/worm',
      previewColor: 'redish-light',
    },
    {
      name: 'Worm 2',
      previewImages: {
        small: 'assets/games/worm/worm-200x200.png',
        large: 'assets/games/worm/worm-400x400.png',
      },
      route: '/games/worm',
      previewColor: 'green',
    },
  ];

  return {
    games,
  };
}
