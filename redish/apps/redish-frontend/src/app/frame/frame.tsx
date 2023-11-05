import { RedishHeader } from '@redish-frontend/shared-ui';
import { Link } from 'react-router-dom';
import './frame.scss';
import {
  authenticationRoutes,
  useAuth,
} from '@redish-frontend/authentication-api';

type FrameProps = { readonly children: React.ReactNode };

export function Frame({ children }: FrameProps) {
  const { token, setToken } = useAuth();
  const logout = () => setToken(null);

  return (
    <>
      <div className="container-frame">
        <RedishHeader handleLogout={logout} />
        <ul>
          <li>
            <Link to="/">Home</Link>
            <Link to="/worm">Worm</Link>
            <Link to={authenticationRoutes.login}>Login</Link>
          </li>
        </ul>
        <p>{token !== null ? 'logged in' : 'not logged in'}</p>
      </div>
      <main>{children}</main>
      <footer className="container-frame">Footer</footer>
    </>
  );
}

export default Frame;
