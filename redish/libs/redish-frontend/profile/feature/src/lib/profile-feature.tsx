import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { useProfileFacade } from '@redish-frontend/profile-data-access';
import { Profile } from '@redish-frontend/profile-ui';

/* eslint-disable-next-line */
export interface ProfileFeatureProps {}

export function ProfileFeature(props: ProfileFeatureProps) {
  const { profileViewModel } = useProfileFacade();

  return (
    <div>
      <Link to="/">Home</Link>

      <h1>Welcome to Profile Feature!</h1>

      <Routes>
        <Route
          path={'/'}
          element={
            <Profile
              modifyUser={profileViewModel.modifyUser}
              handleModifyToggled={profileViewModel.handleModifyToggled}
              handleUsernameChanged={profileViewModel.handleUsernameChanged}
              handleEmailChanged={profileViewModel.handleEmailChanged}
              handlePasswordChanged={profileViewModel.handlePasswordChanged}
              handleModifySubmit={profileViewModel.handleModifySubmit}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default ProfileFeature;
