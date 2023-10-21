import { CreateUserForm } from '@redish-frontend/authentication-ui';
import styles from './authentication-feature.module.scss';
import { useAuthenticationFacade } from '@redish-frontend/authentication-data-access';

/* eslint-disable-next-line */
export interface AuthenticationFeatureProps {}

export function AuthenticationFeature(props: AuthenticationFeatureProps) {
  const { register } = useAuthenticationFacade();

  return (
    <div className={styles['container']}>
      <h1>Welcome to AuthenticationFeature!</h1>
      <CreateUserForm
        registerUser={register.registerUser}
        handleUsernameChanged={register.handleRegisterUserUsernameChanged}
        handleEmailChanged={register.handleRegisterUserEmailChanged}
        handlePasswordChanged={register.handleRegisterUserPasswordChanged}
        handleSubmit={register.handleRegisterUserSubmit}
      />
    </div>
  );
}

export default AuthenticationFeature;
