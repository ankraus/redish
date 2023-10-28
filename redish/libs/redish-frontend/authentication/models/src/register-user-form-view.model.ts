import { RegisterUser } from './register-user.model';

export interface RegisterUserFormViewModel {
  registerUser: RegisterUser;
  handleUsernameChanged: (username: string) => void;
  handleEmailChanged: (email: string) => void;
  handlePasswordChanged: (password: string) => void;
  handleSubmit: () => Promise<void>;
  loginRoute: string;
}
