import {
  Filter,
  GameViewModel,
  GamesState,
} from '@redish-frontend/games-models';
import { Updater, useImmer } from 'use-immer';
import { gameApiService } from '../connector/game-api.service';
import { Route } from 'react-router-dom';
import { lazy, useEffect } from 'react';
import { GameProps } from '@redish-frontend/shared-models';

const initialState: GamesState = {
  initialized: false,
  loading: false,
  games: [],
  totalGamesCount: 0,
  filter: {
    filter: '',
    skip: 0,
    take: 10,
    minNumberOfPlayers: undefined,
    maxNumberOfPlayers: undefined,
  },
};

/**
 * facade hook as described in https://thomasburlesonia.medium.com/https-medium-com-thomasburlesonia-react-hooks-rxjs-facades-4e116330bbe1
 */
export function useGamesFacade(gameProps: GameProps): {
  gamesState: GamesState;
  gameModules: Array<React.ReactNode>;
  handleFilterSet: (filter?: string) => void;
  handleMinNumberSet: (minNumberOfPlayers?: number) => void;
  handleMaxNumberSet: (maxNumberOfPlayers?: number) => void;
  handleSkipSet: (skip: number) => void;
  handleTakeSet: (take: number) => void;
} {
  /**
   * GAMES
   */

  const [gamesState, setGamesState] = useImmer<GamesState>(initialState);
  const [gameModules, setGameModules] = useImmer<Array<React.ReactNode>>([]);

  useEffect(() => {
    loadGames(setGamesState, gamesState.filter);
  }, [gamesState.filter, setGamesState]);

  useEffect(() => {
    loadGameModules(gamesState.games, setGameModules, gameProps);
  }, [gamesState.games, setGameModules]);

  const handleFilterSet = (filter?: string) => {
    setGamesState((state) => {
      state.filter.filter = filter;
      state.filter.skip = 0;
    });
  };

  const handleMinNumberSet = (minNumberOfPlayers?: number) => {
    setGamesState((state) => {
      state.filter.minNumberOfPlayers = minNumberOfPlayers;
      state.filter.skip = 0;
    });
  };

  const handleMaxNumberSet = (maxNumberOfPlayers?: number) => {
    setGamesState((state) => {
      state.filter.maxNumberOfPlayers = maxNumberOfPlayers;
      state.filter.skip = 0;
    });
  };

  const handleSkipSet = (skip: number) => {
    setGamesState((state) => {
      state.filter.skip = skip;
    });
  };

  const handleTakeSet = (take: number) => {
    setGamesState((state) => {
      state.filter.take = take;
      state.filter.skip = 0;
    });
  };

  return {
    gamesState,
    gameModules,
    handleFilterSet,
    handleMinNumberSet,
    handleMaxNumberSet,
    handleSkipSet,
    handleTakeSet,
  };
}

async function loadGames(setGamesState: Updater<GamesState>, filter: Filter) {
  setGamesState((state) => {
    state.loading = true;
  });

  const listResult = await gameApiService.getFiltered(filter);

  setGamesState((state) => {
    state.loading = false;
    state.initialized = true;

    if (listResult.success === false) {
      state.error = listResult.error!;
      return;
    }

    state.games = listResult.result!.results.map((game) => ({
      ...game,
      id: game.readableId,
      module: `games-${game.readableId}/Module`,
      route: `/games/${game.readableId}`,
      previewImages: {
        small: `assets/games/${game.readableId}/${game.readableId}-200x200.png`,
        large: `assets/games/${game.readableId}/${game.readableId}-400x400.png`,
      },
    }));
    state.totalGamesCount = listResult.result!.total;
  });
}

// dynamic import of modules does not work, as typescript needs to know the exact name
// https://stackoverflow.com/questions/65921524/running-into-error-error-cannot-find-module-when-using-dynamic-imports-react
// https://github.com/webpack/webpack/issues/6680
async function loadGameModules(
  games: Array<GameViewModel>,
  setGameModules: Updater<Array<React.ReactNode>>,
  gameProps: GameProps
): Promise<void> {
  setGameModules(
    await Promise.all(
      games.map(async (game) => {
        // const E = lazy(() => import(game.module));
        const E = lazy(() => import('games-worm/Module'));
        return (
          <Route key={game.id} path={game.id} element={<E {...gameProps} />} />
        );
      })
    )
  );
}
