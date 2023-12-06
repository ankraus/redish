import { ModifyUser, ProfileViewModel } from '@redish-frontend/profile-models';
import { useImmer } from 'use-immer';
import { userApiService } from '../connector/user-api.service';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@redish-frontend/authentication-api';

/**
 * facade hook as described in https://thomasburlesonia.medium.com/https-medium-com-thomasburlesonia-react-hooks-rxjs-facades-4e116330bbe1
 */
export function useProfileFacade(): { profileViewModel: ProfileViewModel } {
  /**
   * DELETE
   */
  const navigate = useNavigate();

  async function handleDeleteUser(): Promise<void> {
    const result = await userApiService.delete();

    if (result.success) {
      navigate('/');
    }
  }

  /**
   * MODIFY
   */

  const { user, reloadUser } = useAuth();

  const initialModifyUserState: { modifyUser?: ModifyUser } = {
    modifyUser: undefined,
  };

  const [{ modifyUser }, updateModifyUser] = useImmer<{
    modifyUser?: ModifyUser;
  }>(initialModifyUserState);

  const handleModifyToggled = () => {
    updateModifyUser((draft) => {
      if (!draft.modifyUser && user) {
        // todo use current values
        draft.modifyUser = {
          username: user.username,
          email: user.email,
          password: undefined,
        };
      } else {
        draft.modifyUser = undefined;
      }
    });
  };

  const handleModifyUserUsernameChanged = (username: string) => {
    updateModifyUser((draft) => {
      if (draft.modifyUser) {
        draft.modifyUser.username = username;
      }
    });
  };

  function handleModifyUserEmailChanged(email: string) {
    updateModifyUser((draft) => {
      if (draft.modifyUser) {
        draft.modifyUser.email = email;
      }
    });
  }

  function handleModifyUserPasswordChanged(password: string) {
    updateModifyUser((draft) => {
      if (draft.modifyUser) {
        draft.modifyUser.password = password;
      }
    });
  }

  async function handleModifyUserSubmit(): Promise<void> {
    if (!modifyUser) {
      return;
    }

    const result = await userApiService.update(
      modifyUser.username,
      modifyUser.email,
      modifyUser.password
    );

    if (result.success) {
      updateModifyUser((draft) => {
        draft.modifyUser = initialModifyUserState.modifyUser;
      });

      // todo re-authenticate and get new token
      await reloadUser();
    }
  }

  return {
    profileViewModel: {
      handleDelete: handleDeleteUser,
      handleModifyToggled: handleModifyToggled,
      modifyUser,
      handleUsernameChanged: handleModifyUserUsernameChanged,
      handleEmailChanged: handleModifyUserEmailChanged,
      handlePasswordChanged: handleModifyUserPasswordChanged,
      handleModifySubmit: handleModifyUserSubmit,
      username: user?.username,
    },
  };
}
