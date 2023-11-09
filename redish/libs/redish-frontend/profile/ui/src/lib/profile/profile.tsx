import { ProfileViewModel } from '@redish-frontend/profile-models';
import { RedishButton } from '@redish-frontend/shared-ui';
import styles from './profile.module.scss';

export function Profile(viewModel: Readonly<ProfileViewModel>) {
  return (
    <div className={styles.container}>
      <h1>Profile</h1>
      <div className={styles.information}>
        This is your profile, <strong>{viewModel.username}</strong>. You can
        modify or delete your account using the buttons below.
      </div>
      <div className={styles.modification}>
        <h2>Modify your profile</h2>
        <RedishButton onClick={viewModel.handleModifyToggled}>
          {viewModel.modifyUser ? 'Cancel' : 'Customize Profile'}
        </RedishButton>
        {viewModel.modifyUser && (
          <form>
            <label htmlFor="email">Enter new email address:</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={viewModel.modifyUser.email}
              onChange={(e) => viewModel.handleEmailChanged(e.target.value)}
            />
            <label htmlFor="password">Enter new password:</label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              value={viewModel.modifyUser.password}
              onChange={(e) => viewModel.handlePasswordChanged(e.target.value)}
            />
            <label htmlFor="username">Enter new username:</label>
            <input
              id="username"
              type="username"
              autoComplete="username"
              value={viewModel.modifyUser.username}
              onChange={(e) => viewModel.handleUsernameChanged(e.target.value)}
            />
            <RedishButton
              onClick={() => {
                viewModel.handleModifySubmit();
              }}
            >
              Submit
            </RedishButton>
          </form>
        )}
        {!viewModel.modifyUser && (
          <RedishButton
            onClick={() => {
              viewModel.handleDelete();
            }}
          >
            Delete Account
          </RedishButton>
        )}
      </div>
    </div>
  );
}
