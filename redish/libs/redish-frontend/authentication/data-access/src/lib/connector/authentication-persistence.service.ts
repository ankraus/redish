const tokenName = 'token';

class AuthenticationPersistenceService {
  public getToken(): string | null {
    return localStorage.getItem(tokenName);
  }

  public setToken(token: string): void {
    localStorage.setItem(tokenName, token);
  }

  public removeToken(): void {
    localStorage.removeItem(tokenName);
  }
}

// todo use inversifyjs?
export const authenticationPersistenceService =
  new AuthenticationPersistenceService();
