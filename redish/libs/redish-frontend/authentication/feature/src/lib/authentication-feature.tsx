import { useAuthenticationFacade } from '@redish-frontend/authentication-data-access';
import {
  LoginUserForm,
  RegisterUserForm,
} from '@redish-frontend/authentication-ui';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import styles from './authentication-feature.module.scss';
import { authenticationRoutes as routes } from './authentication-feature.routes';
import { useAuth } from './authentication-provider/auth-provider';

export function AuthenticationFeature() {
  const { setToken } = useAuth();
  const { registerViewModel, loginViewModel } =
    useAuthenticationFacade(setToken);

  return (
    <div className={styles['container']}>
      <Link to="/">Home</Link>

      <h1>Welcome to AuthenticationFeature!</h1>

      <Routes>
        <Route
          path={routes.register.split('/').at(-1)}
          element={
            <RegisterUserForm
              registerUser={registerViewModel.registerUser}
              handleUsernameChanged={registerViewModel.handleUsernameChanged}
              handleEmailChanged={registerViewModel.handleEmailChanged}
              handlePasswordChanged={registerViewModel.handlePasswordChanged}
              handleSubmit={registerViewModel.handleSubmit}
              loginRoute={routes.login}
            />
          }
        />
        <Route
          path="login"
          element={
            <LoginUserForm
              loginUser={loginViewModel.loginUser}
              handleEmailChanged={loginViewModel.handleEmailChanged}
              handlePasswordChanged={loginViewModel.handlePasswordChanged}
              handleSubmit={loginViewModel.handleSubmit}
              registrationRoute={routes.register}
            />
          }
        />
        <Route path="*" element={<Navigate to="login" />} />
      </Routes>
    </div>
  );
}
