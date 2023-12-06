import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GameFacade } from '@redish-backend/usecases';
import { RedishError, Role } from '@redish-shared/domain';
import { Response } from 'express';
import { CreateGameDto } from '../dtos/create-game.dto';
import { GameDto } from '../dtos/game.dto';
import { RedishErrorDto } from '../dtos/redish-error.dto';
import { UpdateGameDto } from '../dtos/update-game.dto';
import { UuidDto } from '../dtos/uuid.dto';
import { AuthGuard } from '../guards/auth.guard';
import { AnyRoleGuard } from '../guards/role.guard';
import { Roles } from '../decorators/roles.decorator';
import { ResultsDto } from '../dtos/results.dto';

@ApiTags('game')
@Controller('game')
export class GameController {
  constructor(private gameFacade: GameFacade) {}

  @ApiCreatedResponse({ type: UuidDto })
  @ApiBadRequestResponse({ type: RedishErrorDto })
  @ApiInternalServerErrorResponse({ type: RedishErrorDto })
  @UseGuards(AuthGuard, AnyRoleGuard)
  @Roles([Role.ADMIN])
  @Post()
  async createGame(
    @Res({ passthrough: true }) response: Response,
    @Body() createGameDto: CreateGameDto
  ): Promise<UuidDto | RedishErrorDto> {
    const createGameResult = await this.gameFacade.createGame(createGameDto);
    if (createGameResult.error) {
      if (
        createGameResult.error.code ===
        RedishError.Infrastructure.Codes.DATABASE_ERROR
      ) {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR);
      } else {
        response.status(HttpStatus.BAD_REQUEST);
      }
      return createGameResult.error;
    }
    return new UuidDto(createGameResult.result!);
  }

  @ApiOkResponse({ type: UuidDto })
  @ApiBadRequestResponse({ type: RedishErrorDto })
  @ApiInternalServerErrorResponse({ type: RedishErrorDto })
  @ApiUnauthorizedResponse({ type: RedishErrorDto })
  @UseGuards(AuthGuard, AnyRoleGuard)
  @Roles([Role.ADMIN])
  @Put()
  async updateGame(
    @Res({ passthrough: true }) response: Response,
    @Body() updateGameDto: UpdateGameDto
  ): Promise<UuidDto | RedishErrorDto> {
    const updateGameResult = await this.gameFacade.updateGame(updateGameDto);
    if (updateGameResult.error) {
      if (
        updateGameResult.error.code ===
        RedishError.Infrastructure.Codes.DATABASE_ERROR
      ) {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR);
      } else {
        response.status(HttpStatus.BAD_REQUEST);
      }
      return updateGameResult.error;
    }
    return new UuidDto(updateGameResult.result!);
  }

  @ApiOkResponse({ type: GameDto })
  @ApiNotFoundResponse({ type: RedishErrorDto })
  @UseGuards(AuthGuard)
  @Get(':id')
  async getGameById(
    @Res({ passthrough: true }) response: Response,
    @Param('id') id: string
  ): Promise<GameDto | RedishErrorDto> {
    const getGameByIdResult = await this.gameFacade.getGameById(id);
    if (getGameByIdResult.error) {
      if (
        getGameByIdResult.error.code ===
        RedishError.Infrastructure.Codes.DATABASE_ERROR
      ) {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR);
      } else {
        response.status(HttpStatus.NOT_FOUND);
      }
      return getGameByIdResult.error;
    }
    return getGameByIdResult.result!;
  }

  @ApiOkResponse({ type: ResultsDto<GameDto> })
  @ApiNotFoundResponse({ type: RedishErrorDto })
  @ApiQuery({ name: 'filter', required: false })
  @Get()
  async getGames(
    @Res({ passthrough: true }) response: Response,
    @Query('skip') skip: number,
    @Query('take') take: number,
    @Query('filter') filter?: string
  ): Promise<ResultsDto<GameDto> | RedishErrorDto> {
    const getGamesResult = await this.gameFacade.getGames({
      filter,
      skip,
      take,
    });
    if (getGamesResult.error) {
      if (
        getGamesResult.error.code ===
        RedishError.Infrastructure.Codes.DATABASE_ERROR
      ) {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR);
      } else {
        response.status(HttpStatus.NOT_FOUND);
      }
      return getGamesResult.error;
    }
    return getGamesResult.result!;
  }

  @ApiInternalServerErrorResponse({ type: RedishErrorDto })
  @ApiUnauthorizedResponse({ type: RedishErrorDto })
  @UseGuards(AuthGuard, AnyRoleGuard)
  @Roles([Role.ADMIN])
  @Delete()
  async deleteGame(
    @Res({ passthrough: true }) response: Response,
    @Query('id') id: string
  ): Promise<UuidDto | RedishErrorDto> {
    const deleteGameResult = await this.gameFacade.deleteGame(id);
    if (deleteGameResult.error) {
      if (
        deleteGameResult.error.code ===
        RedishError.Infrastructure.Codes.DATABASE_ERROR
      ) {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return deleteGameResult.error;
    }
    return deleteGameResult.result!;
  }
}
