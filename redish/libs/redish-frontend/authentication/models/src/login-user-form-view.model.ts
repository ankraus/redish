import { LoginUser } from './login-user.model';

export interface LoginUserFormViewModel {
  loginUser: LoginUser;
  handleEmailChanged: (email: string) => void;
  handlePasswordChanged: (password: string) => void;
  handleSubmit: () => Promise<void>;
  registrationRoute: string;
}
