import { handleAxiosError } from '@redish-frontend/shared-util';
import { Result, UpdateUserDto, UuidDto } from '@redish-shared/domain';
import axios from 'axios';

export class UserApiService {
  // todo: move to config
  private baseURL = 'http://localhost:3000/user';

  public async update(
    username?: string,
    email?: string,
    password?: string
  ): Promise<Result<string>> {
    const url = `${this.baseURL}`;
    const data: UpdateUserDto = { username, password, email };
    try {
      const response = await axios.put<UuidDto>(url, data);
      return Result.success(response.data.uuid);
    } catch (error: unknown) {
      return handleAxiosError(error);
    }
  }

  public async delete(): Promise<Result<string>> {
    const url = `${this.baseURL}`;
    try {
      const response = await axios.delete<UuidDto>(url);
      return Result.success(response.data.uuid);
    } catch (error: unknown) {
      return handleAxiosError(error);
    }
  }
}

// todo use inversifyjs?
export const userApiService = new UserApiService();
