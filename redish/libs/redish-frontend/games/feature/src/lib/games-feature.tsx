import { ProtectedRoute, useAuth } from '@redish-frontend/authentication-api';
import { useGamesFacade } from '@redish-frontend/games-data-access';
import { GamesList } from '@redish-frontend/games-ui';
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import styles from './games-feature.module.scss';
import {
  RedishError,
  RedishFilter,
  RedishLoading,
  RedishPagination,
} from '@redish-frontend/shared-ui';
import { GameProps } from '@redish-frontend/shared-models';
import { verify } from '@redish-frontend/game-utility-api';
import { toast } from 'react-toastify';

/* eslint-disable-next-line */
export interface GamesFeatureProps {}

export function GamesFeature(props: GamesFeatureProps) {
  const { user } = useAuth();

  const gameProps: GameProps = {
    username: user?.username ?? 'Player',
    verify,
    toast: (text, type) =>
      type === 'error' ? toast.error(text) : toast.info(text),
  };

  const {
    gamesState,
    gameModules,
    handleFilterSet,
    handleMinNumberSet,
    handleMaxNumberSet,
    handleSkipSet,
    handleTakeSet,
  } = useGamesFacade(gameProps);
  const navigate = useNavigate();

  if (gamesState.loading && !gamesState.initialized) {
    return <RedishLoading />;
  }

  if (gamesState.error) {
    return <RedishError error={gamesState.error} />;
  }

  return (
    <div className={styles.container}>
      <Routes>
        <Route
          path="/"
          element={
            <div className={styles.main}>
              <RedishFilter
                searchPlaceholder="Search by name"
                searchHoverText="I want to play a game with this name."
                filter={gamesState.filter.filter}
                take={gamesState.filter.take}
                handleFilterSet={handleFilterSet}
                handleTakeSet={handleTakeSet}
                numberFilterItems={[
                  {
                    label: 'Min. Player Count',
                    placeholder: 'min',
                    hoverText:
                      'I want to play with at least this many players.',
                    value: gamesState.filter.minNumberOfPlayers,
                    set: (value) => handleMinNumberSet(value),
                  },
                  {
                    label: 'Max. Player Count',
                    placeholder: 'max',
                    hoverText: 'I want to play with at most this many players.',
                    value: gamesState.filter.maxNumberOfPlayers,
                    set: (value) => handleMaxNumberSet(value),
                  },
                ]}
              />
              <GamesList
                games={gamesState.games}
                handleGameClicked={(route) => navigate(route)}
              />
              <RedishPagination
                total={gamesState.totalGamesCount}
                skip={gamesState.filter.skip}
                take={gamesState.filter.take}
                handleSkipSet={handleSkipSet}
              />
              {gamesState.loading && <RedishLoading absolute />}
            </div>
          }
        />
        <Route
          element={
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          }
          children={gameModules}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
