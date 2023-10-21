import { RegisterUser } from './register-user.model';

export interface CreateUserFormViewModel {
  registerUser: RegisterUser;
  handleUsernameChanged: (username: string) => void;
  handleEmailChanged: (email: string) => void;
  handlePasswordChanged: (password: string) => void;
  handleSubmit: () => void;
}
