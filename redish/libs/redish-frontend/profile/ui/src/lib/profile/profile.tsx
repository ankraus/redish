import { ProfileViewModel } from '@redish-frontend/profile-models';

export function Profile(viewModel: Readonly<ProfileViewModel>) {
  return (
    <div className="container">
      <h1>Profile</h1>
      {!viewModel.modifyUser && (
        <button
          onClick={async (event) => {
            event.preventDefault();
            await viewModel.handleDelete();
          }}
        >
          delete user
        </button>
      )}
      <button onClick={viewModel.handleModifyToggled}>
        {viewModel.modifyUser ? 'Cancel modify' : 'Modify user data'}
      </button>
      {viewModel.modifyUser && (
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            await viewModel.handleModifySubmit();
          }}
        >
          <label>
            Enter new email address:
            <input
              type="email"
              autoComplete="email"
              value={viewModel.modifyUser.email}
              onChange={(e) => viewModel.handleEmailChanged(e.target.value)}
            />
          </label>
          <label>
            Enter new password:
            <input
              type="password"
              autoComplete="new-password"
              value={viewModel.modifyUser.password}
              onChange={(e) => viewModel.handlePasswordChanged(e.target.value)}
            />
          </label>
          <label>
            Enter new username:
            <input
              type="username"
              autoComplete="username"
              value={viewModel.modifyUser.username}
              onChange={(e) => viewModel.handleUsernameChanged(e.target.value)}
            />
          </label>
          <input type="submit" />
        </form>
      )}
    </div>
  );
}
