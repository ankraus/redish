import { LoginUserFormViewModel } from '@redish-frontend/authentication-models';
import { RedishButton, RedishLink } from '@redish-frontend/shared-ui';
import styles from './login-user-form.module.scss';

export function LoginUserForm(viewModel: LoginUserFormViewModel) {
  return (
    <div className={styles.container}>
      <h1>Login here</h1>
      <form>
        <label htmlFor="email">Enter email address:</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={viewModel.loginUser.email}
          onChange={(e) => viewModel.handleEmailChanged(e.target.value)}
        />
        <label htmlFor="password">Enter password:</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={viewModel.loginUser.password}
          onChange={(e) => viewModel.handlePasswordChanged(e.target.value)}
        />
        <RedishButton
          onClick={() => {
            viewModel.handleSubmit();
          }}
        >
          Submit
        </RedishButton>
      </form>
      <p>
        no user yet?{' '}
        <RedishLink to={viewModel.registrationRoute}>Register here</RedishLink>
      </p>
    </div>
  );
}

export default LoginUserForm;
