import { CreateUserForm } from '@redish-frontend/authentication-ui';
import styles from './authentication-feature.module.scss';
import { useAuthenticationFacade } from '@redish-frontend/authentication-data-access';

export function AuthenticationFeature() {
  const { registerViewModel } = useAuthenticationFacade();

  return (
    <div className={styles['container']}>
      <h1>Welcome to AuthenticationFeature!</h1>
      <CreateUserForm viewModel={registerViewModel} />
    </div>
  );
}

export default AuthenticationFeature;
