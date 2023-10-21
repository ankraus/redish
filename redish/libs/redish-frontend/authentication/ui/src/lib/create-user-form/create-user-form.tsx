import styles from './authentication-ui.module.scss';
import { RegisterUser } from '@redish-frontend/authentication-models';

/* eslint-disable-next-line */
export interface CreateUserFormProps {
  registerUser: RegisterUser;
  handleUsernameChanged: (username: string) => void;
  handleEmailChanged: (email: string) => void;
  handlePasswordChanged: (password: string) => void;
  handleSubmit: () => void;
}

export function CreateUserForm(props: CreateUserFormProps) {
  return (
    <div className={styles['container']}>
      <h1>Register here</h1>
      <form onSubmit={props.handleSubmit}>
        <label>
          Enter username:
          <input
            type="text"
            value={props.registerUser.username}
            onChange={(e) => props.handleUsernameChanged(e.target.value)}
          />
        </label>
        <label>
          Enter email address:
          <input
            type="email"
            value={props.registerUser.email}
            onChange={(e) => props.handleEmailChanged(e.target.value)}
          />
        </label>
        <label>
          Choose password:
          <input
            type="password"
            value={props.registerUser.password}
            onChange={(e) => props.handlePasswordChanged(e.target.value)}
          />
        </label>
        <input type="submit" />
      </form>
    </div>
  );
}

export default CreateUserForm;
