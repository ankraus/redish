import {
  AuthenticateUserDto,
  CreateUserDto,
  RedishError,
  TokenDto,
  UuidDto,
} from '@redish-shared/domain';
import axios from 'axios';

export class AuthenticationApiService {
  // todo: move to config
  private baseURL = 'http://localhost:3000/user';

  public async register(
    username: string,
    email: string,
    password: string
  ): Promise<string | null> {
    const url = `${this.baseURL}`;
    const data: CreateUserDto = { username, password, email };
    try {
      const response = await axios.post<UuidDto>(url, data);
      return response.data.uuid;
      // todo: redish error?
    } catch (error) {
      let castError = error;
      if (axios.isAxiosError<RedishError>(error)) {
        console.error('in api service', error.response?.data);
        castError = error.response?.data ?? RedishError.Unknown();
      }
      console.error(castError);
      return null;
    }
  }

  public async login(email: string, password: string): Promise<string | null> {
    const url = `${this.baseURL}/login`;
    const data: AuthenticateUserDto = { password, email };
    try {
      const response = await axios.post<TokenDto>(url, data);
      return response.data.token;
      // todo: redish error?
    } catch (error: unknown) {
      if (axios.isAxiosError<RedishError>(error)) {
        console.error('in api service', error.response?.data);
      }
      return null;
    }
  }
}

// todo use inversifyjs?
export const authenticationApiService = new AuthenticationApiService();
