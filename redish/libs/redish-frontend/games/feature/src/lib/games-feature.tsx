import { ProtectedRoute } from '@redish-frontend/authentication-api';
import { useGamesFacade } from '@redish-frontend/games-data-access';
import { GamesList } from '@redish-frontend/games-ui';
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import styles from './games-feature.module.scss';

/* eslint-disable-next-line */
export interface GamesFeatureProps {}

export function GamesFeature(props: GamesFeatureProps) {
  const { gamesState, gameModules, handleFilterSet, handleSkipSet, handleTakeSet } = useGamesFacade();
  const navigate = useNavigate();

  if (gamesState.loading) {
    return <div>Loading...</div>;
  }

  if (gamesState.error) {
    return <div>{gamesState.error.message}</div>;
  }

  return (
    <div className={styles.container}>
      <Routes>
        <Route
          path="/"
          element={
            <GamesList
              games={gamesState.games}
              total={gamesState.totalGamesCount}
              handleGameClicked={(route) => navigate(route)}
              handleFilterSet={handleFilterSet}
              handleSkipSet={handleSkipSet}
              handleTakeSet={handleTakeSet}
            />
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
