import { User } from '@redish-frontend/profile-api';
import { RedishError, UserDto } from '@redish-shared/domain';
import axios from 'axios';

export class UserApiService {
  // todo: move to config
  private baseURL = 'http://localhost:3000/user';

  public async getSelf(): Promise<User | null> {
    const url = `${this.baseURL}`;
    try {
      const response = await axios.get<UserDto>(url);
      return response.data;
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
}

// todo use inversifyjs?
export const userApiService = new UserApiService();
