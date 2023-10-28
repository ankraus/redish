import {
    AuthenticationFeature,
    authenticationFeatureRoutes,
    useAuth,
} from '@redish-frontend/authentication-feature';
import { RedishHeader } from '@redish-frontend/shared-ui';
import * as React from 'react';
import { Link, Navigate, RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './protected-route';

const Worm = React.lazy(() => import('games-worm/Module'));

/**
 * https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03
 * @returns routes
 */
const Routes = () => {
  const { token, setToken } = useAuth();
  const logout = () => setToken(null);

  // Define public routes accessible to all users
  const routesForPublic: Array<RouteObject> = [
    {
      path: '/',
      element: (
        <>
          <RedishHeader handleLogout={logout} />
      <p>{token !== null ? 'logged in' : 'not logged in'}</p>
      <ul>
        <li>
          <Link to="/">Home</Link>
          <Link to="/worm">Worm</Link>
          <Link to={authenticationFeatureRoutes.login}>Login</Link>
        </li>
      </ul>
          <div>Homepage</div>
        </>
      ),
    },
    {
      path: '*',
      element: <Navigate to="/" />,
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: '/',
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: '/worm',
          element: <Worm />,
        },
        {
          path: '/profile',
          element: <div>User Profile</div>,
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: '/',
      element: <div>Home Page</div>,
    },
    {
      path: authenticationFeatureRoutes.home + '/*',
      element: <AuthenticationFeature />,
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
