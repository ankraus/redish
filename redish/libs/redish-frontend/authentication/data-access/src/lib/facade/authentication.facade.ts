import {
  LoginUser,
  RegisterUser,
} from '@redish-frontend/authentication-models';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useImmer } from 'use-immer';
import { authenticationApiService } from '../connector/authentication-api.service';
import { authenticationPersistenceService } from '../connector/authentication-persistence.service';

/**
 * facade hook as described in https://thomasburlesonia.medium.com/https-medium-com-thomasburlesonia-react-hooks-rxjs-facades-4e116330bbe1
 */
export function useAuthenticationFacade(
  setToken: (token: string | null) => void
): {
  registerViewModel: {
    registerUser: RegisterUser;
    handleUsernameChanged: (username: string) => void;
    handleEmailChanged: (email: string) => void;
    handlePasswordChanged: (password: string) => void;
    handleSubmit: () => Promise<void>;
  };
  loginViewModel: {
    loginUser: LoginUser;
    handleEmailChanged: (email: string) => void;
    handlePasswordChanged: (password: string) => void;
    handleSubmit: () => Promise<void>;
  };
} {
  /**
   * REGISTER
   */
  const initialRegisterUser: RegisterUser = {
    username: '',
    password: '',
    email: '',
  };

  const [registerUser, updateRegisterUser] =
    useImmer<RegisterUser>(initialRegisterUser);

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
    const result = await authenticationApiService.register(
      registerUser.username,
      registerUser.email,
      registerUser.password
    );

    setToken(result);
  }

  /**
   * LOGIN
   */
  const initialLoginUser: LoginUser = {
    password: '',
    email: '',
  };

  const [loginUser, updateLoginUser] = useImmer<LoginUser>(initialLoginUser);

  function handleLoginUserEmailChanged(email: string) {
    updateLoginUser((draft) => {
      draft.email = email;
    });
  }

  function handleLoginUserPasswordChanged(password: string) {
    updateLoginUser((draft) => {
      draft.password = password;
    });
  }

  const navigate = useNavigate();

  async function handleLoginUserSubmit(): Promise<void> {
    const token = await authenticationApiService.login(
      loginUser.email,
      loginUser.password
    );

    if (typeof token !== 'string') {
      return;
    }

    setToken(token);
    navigate('/');
  }

  return {
    registerViewModel: {
      registerUser,
      handleUsernameChanged: handleRegisterUserUsernameChanged,
      handleEmailChanged: handleRegisterUserEmailChanged,
      handlePasswordChanged: handleRegisterUserPasswordChanged,
      handleSubmit: handleRegisterUserSubmit,
    },
    loginViewModel: {
      loginUser,
      handleEmailChanged: handleLoginUserEmailChanged,
      handlePasswordChanged: handleLoginUserPasswordChanged,
      handleSubmit: handleLoginUserSubmit,
    },
  };
}

export const useAuthenticationCore = () => {
  // State to hold the authentication token
  const [token, _setToken] = useState<string | null>(
    authenticationPersistenceService.getToken()
  );

  const setToken = (token: string | null) => {
    _setToken(token);
  };

  // write token to persistence and axios header when state was updated
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      authenticationPersistenceService.setToken(token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      authenticationPersistenceService.removeToken();
    }
  }, [token]);

  return { token, setToken };
};
