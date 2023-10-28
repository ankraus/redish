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
            value={viewModel.registerUser.username}
            onChange={(e) => viewModel.handleUsernameChanged(e.target.value)}
          />
        </label>
        <label>
          Enter email address:
          <input
            type="email"
            value={viewModel.registerUser.email}
            onChange={(e) => viewModel.handleEmailChanged(e.target.value)}
          />
        </label>
        <label>
          Choose password:
          <input
            type="password"
            value={viewModel.registerUser.password}
            onChange={(e) => viewModel.handlePasswordChanged(e.target.value)}
          />
        </label>
        <input type="submit" />
      </form>
      <p>
        already have a user? <Link to={viewModel.loginRoute}>Login here</Link>
      </p>
    </div>
  );
}

export default RegisterUserForm;
