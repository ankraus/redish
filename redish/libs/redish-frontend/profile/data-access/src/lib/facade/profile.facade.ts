import { ModifyUser, ProfileViewModel } from '@redish-frontend/profile-models';
import { useImmer } from 'use-immer';
import { userApiService } from '../connector/user-api.service';
import { useNavigate } from 'react-router-dom';

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

    if (result !== null) {
      navigate('/');
    }
  }

  /**
   * MODIFY
   */

  const initialModifyUserState: { modifyUser?: ModifyUser } = {
    modifyUser: undefined,
  };

  const [{ modifyUser }, updateModifyUser] = useImmer<{
    modifyUser?: ModifyUser;
  }>(initialModifyUserState);

  const handleModifyToggled = () => {
    console.log('toggle');
    updateModifyUser((draft) => {
      if (!draft.modifyUser) {
        // todo use current values
        draft.modifyUser = {
          username: 'current',
          email: 'current',
          password: 'current',
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

    if (result !== null) {
      updateModifyUser((draft) => {
        draft = initialModifyUserState;
      });
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
    },
  };
}
