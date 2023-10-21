export class AuthenticationState {
  private _createUser: UserDto|null = null;

  public get createUser(): UserDto|null {
    return this._createUser;
  }

  public set createUserUsername(username: string) {
    if (this._createUser) {
      this._createUser.username = username;
    }
  }

  public set createUserEmail(email: string) {
    if (this._createUser) {
      this._createUser.email = email;
    }
  }

  public set createUserPassword(password: string) {
    if (this._createUser) {
      this._createUser.password = password;
    }
  }

  public initCreateUser(): void {
    this._createUser = new UserDto();
  }
}


class UserDto {
  username = '';
  password = '';
  email = '';
}
