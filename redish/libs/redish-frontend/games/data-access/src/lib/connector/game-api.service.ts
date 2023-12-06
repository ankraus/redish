import { Filter, Game } from '@redish-frontend/games-models';
import { GameDto, RedishError, ResultsDto } from '@redish-shared/domain';
import axios from 'axios';

export class GameApiService {
  // todo: move to config
  private baseURL = 'http://localhost:3000/game';

  public async getById(uuid: string): Promise<Game | null> {
    const url = `${this.baseURL}/${uuid}`;
    try {
      const response = await axios.get<GameDto>(url);
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

  public async getFiltered(filter: Filter): Promise<ResultsDto<Game> | RedishError> {
    const url = `${this.baseURL}`;
    try {
      const response = await axios.get<ResultsDto<GameDto>>(url, { params: filter });
      return response.data;
      // todo: redish error?
    } catch (error) {
      let castError =  RedishError.Unknown();
      if (axios.isAxiosError<RedishError>(error)) {
        console.error('in api service', error.response?.data);
        castError = error.response?.data ?? castError;
      }
      
      console.error(castError);
      return castError;
    }
  }
}

// todo use inversifyjs?
export const gameApiService = new GameApiService();
