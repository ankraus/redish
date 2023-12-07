import {
  LoginUser,
  RegisterUser,
} from '@redish-frontend/authentication-models';
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useImmer } from 'use-immer';
import { authenticationApiService } from '../connector/authentication-api.service';
import { authenticationPersistenceService } from '../connector/authentication-persistence.service';
import { userApiService } from '../connector/user-api.service';
import { User } from '@redish-frontend/profile-api';
import { TokenDto } from '@redish-shared/domain';

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

    if (result.success) {
      const tokenResult = await authenticationApiService.login(
        registerUser.email,
        registerUser.password
      );
      setToken(tokenResult.success ? tokenResult.result : null);
    }
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
    const tokenResult = await authenticationApiService.login(
      loginUser.email,
      loginUser.password
    );

    if (!tokenResult.success) {
      return;
    }

    setToken(tokenResult.result);
    // todo: navigate to previous page
    navigate('/');
  }

  async function handleLogout(): Promise<void> {
    await authenticationApiService.logout();
    setToken(null);
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

export function useAuthenticationCore(): {
  token: string | null;
  setToken: (token: string | null) => void;
  user: User | null;
  reloadUser: () => Promise<void>;
  logout: () => Promise<void>;
} {
  // State to hold the authentication token
  const [token, _setToken] = useState<string | null>(
    authenticationPersistenceService.getToken()
  );

  const setToken = (token: string | null) => {
    _setToken(token);
  };

  // State to hold the authenticated user
  const [user, _setUser] = useState<User | null>(null);

  async function getSelf() {
    const nextUserResult = await userApiService.getSelf();
    _setUser(nextUserResult.success ? nextUserResult.result : null);
  }

  // write token to persistence and axios header when state was updated
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      authenticationPersistenceService.setToken(token);
      getSelf();
    } else {
      delete axios.defaults.headers.common['Authorization'];
      authenticationPersistenceService.removeToken();
      _setUser(null);
    }
  }, [token]);

  // todo: move to config
  const refreshUrl = 'http://localhost:3000/user/refreshtoken';

  // using interceptor to refresh token, https://github.com/Flyrell/axios-auth-refresh
  // there is still a bug here when logging out and failing the next login, I can't seem to fix it
  createAuthRefreshInterceptor(
    axios,
    (failedRequest) =>
      axios.post<TokenDto>(refreshUrl).then((tokenRefreshResponse) => {
        _setToken(tokenRefreshResponse.data.token);
        failedRequest.response.config.headers['Authorization'] =
          'Bearer ' + tokenRefreshResponse.data.token;
        return Promise.resolve();
      }),
    {
      shouldRefresh: (error) => {
        return (
          (error.response?.status === 401 || error.response?.status === 403) &&
          token != null
        );
      },
    }
  );

  async function reloadUser() {
    if (token) {
      await getSelf();
    } else {
      _setUser(null);
    }
  }

  async function logout() {
    await authenticationApiService.logout();
    setToken(null);
  }

  return { token, setToken, user, reloadUser, logout };
}
