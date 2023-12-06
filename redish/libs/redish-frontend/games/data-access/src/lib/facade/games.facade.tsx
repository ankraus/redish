import {
  Filter,
  GameViewModel,
  GamesState,
} from '@redish-frontend/games-models';
import { RedishError } from '@redish-shared/domain';
import { Updater, useImmer } from 'use-immer';
import { gameApiService } from '../connector/game-api.service';
import { Route } from 'react-router-dom';
import { useEffect } from 'react';
import React from 'react';

const initialState: GamesState = {
  initialized: false,
  loading: false,
  games: [],
  totalGamesCount: 0,
  filter: {
    filter: '',
    skip: 0,
    take: 10,
  },
};

/**
 * facade hook as described in https://thomasburlesonia.medium.com/https-medium-com-thomasburlesonia-react-hooks-rxjs-facades-4e116330bbe1
 */
export function useGamesFacade(): {
  gamesState: GamesState;
  gameModules: Array<React.ReactNode>;
  worm: {
    handleWormLog: (test: string) => void;
  };
  handleFilterSet: (filter?: string) => void;
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
    loadGameModules(gamesState.games, setGameModules);
  }, [gamesState.games, setGameModules]);

  const handleFilterSet = (filter?: string) => {
    setGamesState((state) => {
      state.filter.filter = filter;
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
    });
  };

  // todo remove WORM
  const handleWormLog = (test: string) => {
    console.log('WORM LOG', test);
  };

  return {
    gamesState: gamesState,
    gameModules,
    worm: {
      handleWormLog,
    },
    handleFilterSet,
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

// https://stackoverflow.com/questions/65921524/running-into-error-error-cannot-find-module-when-using-dynamic-imports-react
// https://github.com/webpack/webpack/issues/6680
async function loadGameModules(
  games: Array<GameViewModel>,
  setGameModules: Updater<Array<React.ReactNode>>
): Promise<void> {
  setGameModules(
    await Promise.all(
      games.map(async (game) => {
        // const E = React.lazy(() => import(game.module));
        const E = React.lazy(() => import('games-worm/Module'));
        return <Route key={game.id} path={game.id} element={<E />} />;
      })
    )
  );
}
