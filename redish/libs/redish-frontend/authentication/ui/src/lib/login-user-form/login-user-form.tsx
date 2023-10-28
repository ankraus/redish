import { LoginUserFormViewModel } from '@redish-frontend/authentication-models';
import { Link } from 'react-router-dom';

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
            value={viewModel.loginUser.email}
            onChange={(e) => viewModel.handleEmailChanged(e.target.value)}
          />
        </label>
        <label>
          Enter password:
          <input
            type="password"
            value={viewModel.loginUser.password}
            onChange={(e) => viewModel.handlePasswordChanged(e.target.value)}
          />
        </label>
        <input type="submit" />
      </form>
      <p>
        no user yet? <Link to={viewModel.registrationRoute}>Register here</Link>
      </p>
    </div>
  );
}

export default LoginUserForm;
