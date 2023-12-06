import { User } from '@redish-frontend/profile-api';
import { handleAxiosError } from '@redish-frontend/shared-util';
import { Result, UserDto } from '@redish-shared/domain';
import axios from 'axios';

export class UserApiService {
  // todo: move to config
  private baseURL = 'http://localhost:3000/user';

  public async getSelf(): Promise<Result<User>> {
    const url = `${this.baseURL}`;
    try {
      const response = await axios.get<UserDto>(url);
      return Result.success(response.data);
    } catch (error: unknown) {
      return handleAxiosError(error);
    }
  }
}

// todo use inversifyjs?
export const userApiService = new UserApiService();
