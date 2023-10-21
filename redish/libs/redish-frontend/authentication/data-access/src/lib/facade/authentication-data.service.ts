import { RegisterUser } from '@redish-frontend/authentication-models';
import { useImmer } from 'use-immer';
import { authenticationService } from '../connector/authentication-api.service';

/**
 * facade hook as described in https://thomasburlesonia.medium.com/https-medium-com-thomasburlesonia-react-hooks-rxjs-facades-4e116330bbe1
 */
export function useAuthenticationFacade(): {
  register: {
    registerUser: RegisterUser;
    handleRegisterUserUsernameChanged: (username: string) => void;
    handleRegisterUserEmailChanged: (email: string) => void;
    handleRegisterUserPasswordChanged: (password: string) => void;
    handleRegisterUserSubmit: () => Promise<void>;
  };
} {
  const initialRegisterUser: RegisterUser = {
    username: '',
    password: '',
    email: '',
  };
  const [registerUser, updateRegisterUser] = useImmer<RegisterUser>(initialRegisterUser);

  const handleRegisterUserUsernameChanged = (username: string) => {
    updateRegisterUser((draft) => {
      draft.username = username;
    });
  };

  function handleRegisterUserEmailChanged(email: string) {
    updateRegisterUser((draft) => {
      draft.email = email;
    });
  }

  function handleRegisterUserPasswordChanged(password: string) {
    updateRegisterUser((draft) => {
      draft.password = password;
    });
  }

  async function handleRegisterUserSubmit(): Promise<void> {
    await authenticationService.register(
      registerUser.username,
      registerUser.email,
      registerUser.password
    );
  }

  return {
    register: {
      registerUser,
      handleRegisterUserUsernameChanged,
      handleRegisterUserEmailChanged,
      handleRegisterUserPasswordChanged,
      handleRegisterUserSubmit,
    },
  };
}
