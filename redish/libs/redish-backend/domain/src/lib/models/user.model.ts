export class User {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public pw: string,
    public isActive: boolean
  ) {}
}
