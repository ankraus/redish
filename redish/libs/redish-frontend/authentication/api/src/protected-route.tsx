import { authenticationRoutes, useAuth } from '@redish-frontend/authentication-feature';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = { children: React.ReactNode };

/**
 * Authenticated routing from: https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03
 * @returns ProtectedRoute component, which checks for token and redirects to login if not present.
 */
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { token } = useAuth();

  // Check if the user is authenticated
  if (!token) {
    // If not authenticated, redirect to the login page
    return <Navigate to={authenticationRoutes.login} />;
  }

  // If authenticated, render the child routes
  return children;
};
