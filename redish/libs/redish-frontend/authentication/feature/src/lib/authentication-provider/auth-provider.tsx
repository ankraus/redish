import axios from 'axios';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

/**
 * Auth provider as in https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03
 */

const AuthContext = createContext<{
  token: string | null;
  setToken: (newToken: string | null) => void;
}>({
  token: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setToken: () => {},
});

type AuthProviderProps = { children: ReactNode };

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // State to hold the authentication token
  const [token, _setToken] = useState(localStorage.getItem('token'));

  // Function to set the authentication token
  const setToken = (newToken: string | null) => {
    _setToken(newToken);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token]);

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
  return useContext(AuthContext);
};
