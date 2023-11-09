import * as React from 'react';
import {
  Navigate,
  RouteObject,
  RouterProvider,
  Outlet,
  createBrowserRouter,
} from 'react-router-dom';
import { ProtectedRoute } from './protected-route';
import ErrorPage from './error-page';
import Frame from '../app/frame/frame';
import {
  authenticationRoutes,
  useAuth,
} from '@redish-frontend/authentication-api';

const Worm = React.lazy(() => import('games-worm/Module'));

/**
 * https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03
 * @returns routes
 */
const Routes = () => {
  const { token, user } = useAuth();

  // Define public routes accessible to all users
  const routesForPublic: Array<RouteObject> = [
    {
      path: '/',
      element: (
        <Frame>
          <div>Homepage</div>
        </Frame>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: '*',
      element: <Navigate to="/" />,
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly: Array<RouteObject> = [
    {
      path: '/',
      element: (
        <Frame>
          {user && <div>Logged in as {user.username}</div>}
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        </Frame>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/worm',
          element: <Worm />,
        },
        {
          path: 'profile/*',
          lazy: () =>
            import('@redish-frontend/profile-feature').then((module) => ({
              Component: module.ProfileFeature,
            })),
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly: Array<RouteObject> = [
    {
      path: '/',
      element: (
        <Frame>
          <Outlet />
        </Frame>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: authenticationRoutes.home + '/*',
          // todo check lazy loading
          lazy: () =>
            import('@redish-frontend/authentication-feature').then(
              (module) => ({ Component: module.AuthenticationFeature })
            ),
        },
      ],
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
