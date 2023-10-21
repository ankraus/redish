export class User {
  id: string;
  username: string;
  email: string;
  pw: string;
  isActive: boolean;

  constructor(
    id: string,
    username: string,
    email: string,
    pw: string,
    isActive: boolean
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.pw = pw;
    this.isActive = isActive;
  }
}
