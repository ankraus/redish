import { Injectable } from '@nestjs/common';
import { Game, Result } from '@redish-backend/domain';
import {
  CreateGameDto,
  GameFilterDto,
  ResultsDto,
  UpdateGameDto,
} from '@redish-shared/domain';
import { GameRepository } from './repositories/game.repository';
import { AuthenticationService } from './interfaces/authentication.service';

@Injectable()
export class GameFacade {
  constructor(
    private gameRepository: GameRepository,
    private authenticationService: AuthenticationService
  ) {}

  public async createGame(
    createGameDto: CreateGameDto
  ): Promise<Result<string>> {
    const uuidResult = await this.authenticationService.generateUuid();
    if (uuidResult.error) {
      return Result.error(uuidResult.error);
    }
    return this.gameRepository.save({
      uuid: uuidResult.result!,
      ...createGameDto,
    });
  }

  public updateGame(updateGameDto: UpdateGameDto): Promise<Result<string>> {
    return this.gameRepository.save(updateGameDto);
  }

  public async getGameById(id: string): Promise<Result<Game>> {
    const t = await this.gameRepository.findOneById(id);
    console.log(t);
    return t;
  }

  public async getGames(filter: GameFilterDto): Promise<Result<ResultsDto<Game>>> {
    const result = await this.gameRepository.findAll(
      filter.skip,
      filter.take,
      filter.filter,
      filter.minNumberOfPlayers,
      filter.maxNumberOfPlayers
    );

    if (result.success) {
      const [games, total] = result.result!;
      return Result.success({ results: games, total: total });
    }

    return Result.error(result.error!);
  }

  public deleteGame(id: string): Promise<Result> {
    return this.gameRepository.remove(id);
  }
}
