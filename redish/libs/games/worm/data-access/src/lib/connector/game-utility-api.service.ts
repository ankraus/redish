import { handleAxiosError } from '@redish-frontend/shared-util';
import { Result } from '@redish-shared/domain';
import axios from 'axios';

export class GameUtilityApiService {
  // todo: move to config
  private baseURL = 'http://localhost:3000/game-utility';

  public async verify(word: string): Promise<Result<boolean>> {
    const url = `${this.baseURL}/dictionary/${word}`;

    try {
      const response = await axios.get<boolean>(url);
      return Result.success(response.data);
    } catch (error: unknown) {
      return handleAxiosError(error);
    }
  }
}

// todo use inversifyjs?
export const gameUtilityApiService = new GameUtilityApiService();
