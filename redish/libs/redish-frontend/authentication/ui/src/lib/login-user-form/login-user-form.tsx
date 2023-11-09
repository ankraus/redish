import { LoginUserFormViewModel } from '@redish-frontend/authentication-models';
import { RedishLink } from '@redish-frontend/shared-ui';

export function LoginUserForm(viewModel: LoginUserFormViewModel) {
  return (
    <div className="container">
      <h1>Login here</h1>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await viewModel.handleSubmit();
        }}
      >
        <label>
          Enter email address:
          <input
            type="email"
            autoComplete='email'
            required
            value={viewModel.loginUser.email}
            onChange={(e) => viewModel.handleEmailChanged(e.target.value)}
          />
        </label>
        <label>
          Enter password:
          <input
            type="password"
            autoComplete="current-password"
            required
            value={viewModel.loginUser.password}
            onChange={(e) => viewModel.handlePasswordChanged(e.target.value)}
          />
        </label>
        <input type="submit" />
      </form>
      <p>
        no user yet? <RedishLink to={viewModel.registrationRoute}>Register here</RedishLink>
      </p>
    </div>
  );
}

export default LoginUserForm;
