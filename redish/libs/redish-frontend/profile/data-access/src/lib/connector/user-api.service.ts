import { RedishError, UpdateUserDto, UuidDto } from '@redish-shared/domain';
import axios from 'axios';

export class UserApiService {
  // todo: move to config
  private baseURL = 'http://localhost:3000/user';

  public async update(
    username?: string,
    email?: string,
    password?: string
  ): Promise<string | null> {
    const url = `${this.baseURL}`;
    const data: UpdateUserDto = { username, password, email };
    try {
      const response = await axios.put<UuidDto>(url, data);
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

  public async delete(): Promise<string | null> {
    const url = `${this.baseURL}`;
    try {
      const response = await axios.delete<UuidDto>(url);
      return response.data.uuid;
    } catch (error: unknown) {
      let castError = error;
      if (axios.isAxiosError<RedishError>(error)) {
        console.error('in api service', error.response?.data);
        castError = error.response?.data ?? RedishError.Unknown();
      }
      console.error(castError);
      return null;
    }
  }
}

// todo use inversifyjs?
export const userApiService = new UserApiService();
