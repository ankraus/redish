import { useAuthenticationCore } from '@redish-frontend/authentication-data-access';
import { ReactNode, createContext, useContext, useMemo } from 'react';

/**
 * Auth provider as in https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03
 */

export const AuthContext = createContext<{
  token: string | null;
  setToken: (newToken: string | null) => void;
} | null>(null);

type AuthProviderProps = { children: ReactNode };

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { token, setToken } = useAuthenticationCore();

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return authContext;
};
