import {
  authenticationRoutes,
  useAuth,
} from '@redish-frontend/authentication-api';
import { RedishFooter, RedishHeader, RedishLoading } from '@redish-frontend/shared-ui';
import { useNavigate } from 'react-router-dom';
import styles from './frame.module.scss';
import { Suspense } from 'react';

type FrameProps = { children: React.ReactNode };

export function Frame({ children }: Readonly<FrameProps>) {
  const { token, setToken, user } = useAuth();
  const logout = () => setToken(null);
  const navigate = useNavigate();

  const headerActions: Array<{
    labelSmall?: string;
    label: string;
    onClick: () => void;
  }> =
    token && user
      ? [
          {
            labelSmall: 'Profile',
            label: `Hello, ${user.username}`,
            onClick: () => navigate('/profile'),
          },
          { label: 'Logout', onClick: logout },
        ]
      : [
          {
            label: 'Login',
            onClick: () => navigate(authenticationRoutes.login),
          },
          {
            label: 'Register',
            onClick: () => navigate(authenticationRoutes.register),
          },
        ];

  return (
    <div className={styles.container}>
      <RedishHeader
        actions={headerActions}
        navigation={[]}
        handleLogoClicked={() => navigate('/')}
      />
      <main>
        <Suspense fallback={<RedishLoading />}>{children}</Suspense>
        <RedishFooter
          navigation={[
            {
              label: 'GitHub',
              to: 'https://github.com/ankraus/redish',
              external: true,
            },
          ]}
        ></RedishFooter>
      </main>
    </div>
  );
}

export default Frame;
