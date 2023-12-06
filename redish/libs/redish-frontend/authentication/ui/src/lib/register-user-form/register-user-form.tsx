import { RegisterUserFormViewModel } from '@redish-frontend/authentication-models';
import styles from './register-user-form.module.scss';
import { RedishButton, RedishLink } from '@redish-frontend/shared-ui';

export function RegisterUserForm(viewModel: RegisterUserFormViewModel) {
  return (
    <div className={styles.container}>
      <h1>Register here</h1>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await viewModel.handleSubmit();
        }}
      >
        <label htmlFor="username">Enter username:</label>
        <input
          id="username"
          type="text"
          autoComplete="username"
          required
          value={viewModel.registerUser.username}
          onChange={(e) => viewModel.handleUsernameChanged(e.target.value)}
        />
        <label htmlFor="email">Enter email address:</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={viewModel.registerUser.email}
          onChange={(e) => viewModel.handleEmailChanged(e.target.value)}
        />
        <label htmlFor="password">Choose password:</label>

        <input
          id="password"
          type="password"
          autoComplete="new-password"
          required
          value={viewModel.registerUser.password}
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
        already registered?{' '}
        <RedishLink to={viewModel.loginRoute}>Login here</RedishLink>
      </p>
    </div>
  );
}

export default RegisterUserForm;
