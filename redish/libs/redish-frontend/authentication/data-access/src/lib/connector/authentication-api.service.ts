import { CreateUserDTO } from '@redish-shared/domain';
import axios from 'axios';

export class AuthenticationService {
  private baseURL = 'https://localhost:3000/auth';

  public async register(
    username: string,
    email: string,
    password: string
  ): Promise<string | null> {
    const url = `${this.baseURL}/login`;
    const data: CreateUserDTO = { username, password, email };
    try {
      const uuid = await axios
        .post<string>(url, data)
        .then((response) => response.data);
      return uuid;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

// todo use inversifyjs?
export const authenticationService = new AuthenticationService();
