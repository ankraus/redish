import styles from './authentication-ui.module.scss';
import { CreateUserFormViewModel } from '@redish-frontend/authentication-models';

export function CreateUserForm(props: {viewModel: CreateUserFormViewModel}) {
  const viewModel = props.viewModel;
  
  return (
    <div className={styles['container']}>
      <h1>Register here</h1>
      <form onSubmit={viewModel.handleSubmit}>
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
    </div>
  );
}

export default CreateUserForm;
