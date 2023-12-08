import { handleAxiosError } from '@redish-frontend/shared-util';
import {
  AuthenticateUserDto,
  CreateUserDto,
  Result,
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
  ): Promise<Result<string>> {
    const url = `${this.baseURL}`;
    const data: CreateUserDto = { username, password, email };
    try {
      const response = await axios.post<UuidDto>(url, data);
      return Result.success(response.data.uuid);
    } catch (error) {
      return handleAxiosError(error);
    }
  }

  public async login(email: string, password: string): Promise<Result<string>> {
    const url = `${this.baseURL}/login`;
    const data: AuthenticateUserDto = { password, email };
    try {
      const response = await axios.post<TokenDto>(url, data);
      return Result.success(response.data.token);
    } catch (error: unknown) {
      return handleAxiosError(error);
    }
  }

  public async logout(): Promise<Result<void>> {
    const url = `${this.baseURL}/logout`;
    try {
      await axios.post<void>(url);
      return Result.success();
    } catch (error: unknown) {
      return handleAxiosError(error);
    }
  }
}

// todo use inversifyjs?
export const authenticationApiService = new AuthenticationApiService();
