import { ProtectedRoute, useAuth } from '@redish-frontend/authentication-api';
import { useGamesFacade } from '@redish-frontend/games-data-access';
import { GamesList } from '@redish-frontend/games-ui';
import { WormAppProps } from '@redish-frontend/shared-models';
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

  const wormAppProps: WormAppProps = {
    username: user?.username ?? 'heinrich',
    handleTest: worm.handleWormLog,
  };

  return (
    <div className={styles.container}>
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
              element={<Worm {...wormAppProps} />}
            />,
          ]}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
