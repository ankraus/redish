import { Navigate, Route, Routes } from 'react-router-dom';
import { useProfileFacade } from '@redish-frontend/profile-data-access';
import { Profile } from '@redish-frontend/profile-ui';
import styles from './profile-feature.module.scss';

/* eslint-disable-next-line */
export interface ProfileFeatureProps {}

export function ProfileFeature(props: ProfileFeatureProps) {
  const { profileViewModel } = useProfileFacade();
  return (
    <div className={styles.container}>
      <Routes>
        <Route
          path={'/'}
          element={
            <Profile
              handleDelete={profileViewModel.handleDelete}
              modifyUser={profileViewModel.modifyUser}
              handleModifyToggled={profileViewModel.handleModifyToggled}
              handleUsernameChanged={profileViewModel.handleUsernameChanged}
              handleEmailChanged={profileViewModel.handleEmailChanged}
              handlePasswordChanged={profileViewModel.handlePasswordChanged}
              handleModifySubmit={profileViewModel.handleModifySubmit}
              username={profileViewModel.username}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default ProfileFeature;
