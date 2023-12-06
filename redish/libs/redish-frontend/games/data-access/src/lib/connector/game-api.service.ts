import { Filter, Game } from '@redish-frontend/games-models';
import { GameDto, Result, ResultsDto } from '@redish-shared/domain';
import axios from 'axios';
import { handleAxiosError } from '@redish-frontend/shared-util';

export class GameApiService {
  // todo: move to config
  private baseURL = 'http://localhost:3000/game';

  public async getById(uuid: string): Promise<Result<Game>> {
    const url = `${this.baseURL}/${uuid}`;
    try {
      const response = await axios.get<GameDto>(url);
      return Result.success(response.data);
    } catch (error: unknown) {
      return handleAxiosError(error);
    }
  }

  public async getFiltered(filter: Filter): Promise<Result<ResultsDto<Game>>> {
    const url = `${this.baseURL}`;

    try {
      const response = await axios.get<ResultsDto<GameDto>>(url, {
        params: filter,
      });
      return Result.success(response.data);
    } catch (error: unknown) {
      return handleAxiosError(error);
    }
  }
}

// todo use inversifyjs?
export const gameApiService = new GameApiService();
