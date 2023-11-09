import { ProtectedRoute, useAuth } from '@redish-frontend/authentication-api';
import { useGamesFacade } from '@redish-frontend/games-data-access';
import { GamesList } from '@redish-frontend/games-ui';
import * as React from 'react';
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import styles from './games-feature.module.scss';

const Worm = React.lazy(() => import('games-worm/Module'));

/* eslint-disable-next-line */
export interface GamesFeatureProps {}

export function GamesFeature(props: GamesFeatureProps) {
  const { games, worm } = useGamesFacade();
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className={styles['container']}>
      {user && (
        <Routes>
          <Route
            path="/"
            element={
              <GamesList
                games={games}
                handleGameClicked={(route) => navigate(route)}
              />
            }
          />
          <Route
            element={
              <ProtectedRoute>
                <Outlet />
              </ProtectedRoute>
            }
            children={[
              <Route
                key="worm"
                path="worm"
                element={
                  <Worm test={user.username} handleTest={worm.handleWormLog} />
                }
              />,
            ]}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </div>
  );
}
