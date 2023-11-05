import { ModifyUser } from './modify-user.model';

export interface ProfileViewModel {
  handleDelete: () => Promise<void>;
  handleModifyToggled: () => void;
  modifyUser?: ModifyUser;
  handleUsernameChanged: (user: string) => void;
  handleEmailChanged: (email: string) => void;
  handlePasswordChanged: (password: string) => void;
  handleModifySubmit: () => Promise<void>;
}
