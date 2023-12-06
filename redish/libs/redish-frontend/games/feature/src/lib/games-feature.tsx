import { ProtectedRoute } from '@redish-frontend/authentication-api';
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

/* eslint-disable-next-line */
export interface GamesFeatureProps {}

export function GamesFeature(props: GamesFeatureProps) {
  const {
    gamesState,
    gameModules,
    handleFilterSet,
    handleSkipSet,
    handleTakeSet,
  } = useGamesFacade();
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
                filterDescription='Search by name'
                total={gamesState.totalGamesCount}
                filter={gamesState.filter.filter}
                skip={gamesState.filter.skip}
                take={gamesState.filter.take}
                handleFilterSet={handleFilterSet}
                handleTakeSet={handleTakeSet}
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
                handleTakeSet={handleTakeSet}
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
