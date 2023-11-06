import { RegisterUserFormViewModel } from '@redish-frontend/authentication-models';
import { Link } from 'react-router-dom';

export function RegisterUserForm(viewModel: RegisterUserFormViewModel) {
  return (
    <div className="container">
      <h1>Register here</h1>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await viewModel.handleSubmit();
        }}
      >
        <label>
          Enter username:
          <input
            type="text"
            autoComplete="username"
            required
            value={viewModel.registerUser.username}
            onChange={(e) => viewModel.handleUsernameChanged(e.target.value)}
          />
        </label>
        <label>
          Enter email address:
          <input
            type="email"
            autoComplete="email"
            required
            value={viewModel.registerUser.email}
            onChange={(e) => viewModel.handleEmailChanged(e.target.value)}
          />
        </label>
        <label>
          Choose password:
          <input
            type="password"
            autoComplete="new-password"
            required
            value={viewModel.registerUser.password}
            onChange={(e) => viewModel.handlePasswordChanged(e.target.value)}
          />
        </label>
        <input type="submit" />
      </form>
      <p>
        already registered? <Link to={viewModel.loginRoute}>Login here</Link>
      </p>
    </div>
  );
}

export default RegisterUserForm;
