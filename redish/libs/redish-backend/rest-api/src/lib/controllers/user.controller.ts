import {
  Body,
  Controller,
  Get,
  Delete,
  HttpStatus,
  Injectable,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserFacade } from '@redish-backend/usecases';
import { AuthenticateUserDto } from '../dtos/authenticate-user.dto';
import { TokenDto } from '../dtos/token.dto';
import { UuidDto } from '../dtos/uuid.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserDto } from '../dtos/user.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';
import { Response } from 'express';
import { RedishErrorDto } from '../dtos/redish-error.dto';
import { RedishError } from '@redish-shared/domain';
import { AuthenticatedRequest } from '../types/authenticated-request.type';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { Request } from 'express';

@ApiTags('user')
@Controller('user')
@Injectable()
export class UserController {
  constructor(private userFacade: UserFacade) {}

  @ApiOkResponse({ type: TokenDto })
  @ApiBadRequestResponse({ type: RedishErrorDto })
  @ApiInternalServerErrorResponse({ type: RedishErrorDto })
  @Post('login')
  public async authenticateUser(
    @Res({ passthrough: true }) response: Response,
    @Body() authenticateUserDto: AuthenticateUserDto
  ): Promise<TokenDto | RedishErrorDto> {
    const authResult = await this.userFacade.authenticateUser(
      authenticateUserDto
    );
    if (authResult.error) {
      if (
        authResult.error.code ===
        RedishError.Infrastructure.Codes.DATABASE_ERROR
      ) {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR);
      } else {
        response.status(HttpStatus.BAD_REQUEST);
      }
      return authResult.error;
    }
    response.cookie('refreshToken', authResult.result!.refreshToken, {
      httpOnly: true,
    });
    return { token: authResult.result!.token };
  }

  @ApiOkResponse({ type: TokenDto })
  @ApiBadRequestResponse({ type: RedishErrorDto })
  @ApiInternalServerErrorResponse({ type: RedishErrorDto })
  @Post('refreshtoken')
  public async refreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ): Promise<TokenDto | RedishErrorDto> {
    const refreshToken = request.cookies['refreshToken'];
    if (!refreshToken) {
      response.status(HttpStatus.BAD_REQUEST);
      return RedishError.Domain.badRequestError();
    }

    const refreshResult = await this.userFacade.refreshToken(refreshToken);

    if (refreshResult.error) {
      if (
        refreshResult.error.code ===
        RedishError.Infrastructure.Codes.DATABASE_ERROR
      ) {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR);
      } else {
        response.status(HttpStatus.BAD_REQUEST);
      }
      return refreshResult.error;
    }
    response.cookie('refreshToken', refreshResult.result!.refreshToken, {
      httpOnly: true,
    });
    return { token: refreshResult.result!.token };
  }

  @ApiCreatedResponse({ type: UuidDto })
  @ApiBadRequestResponse({ type: RedishErrorDto })
  @ApiInternalServerErrorResponse({ type: RedishErrorDto })
  @Post()
  async createUser(
    @Res({ passthrough: true }) response: Response,
    @Body() createUserDto: CreateUserDto
  ): Promise<UuidDto | RedishErrorDto> {
    const createUserResult = await this.userFacade.createUser(createUserDto);
    if (createUserResult.error) {
      if (
        createUserResult.error.code ===
        RedishError.Infrastructure.Codes.DATABASE_ERROR
      ) {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR);
      } else {
        response.status(HttpStatus.BAD_REQUEST);
      }
      return createUserResult.error;
    }
    return createUserResult.result!;
  }

  @ApiOkResponse({ type: UuidDto })
  @ApiBadRequestResponse({ type: RedishErrorDto })
  @ApiInternalServerErrorResponse({ type: RedishErrorDto })
  @ApiUnauthorizedResponse({ type: RedishErrorDto })
  @UseGuards(AuthGuard)
  @Put()
  async updateUser(
    @Res({ passthrough: true }) response: Response,
    @Req() request: AuthenticatedRequest,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<UuidDto | RedishErrorDto> {
    const updateUserResult = await this.userFacade.updateUser(
      request.userId,
      updateUserDto
    );
    if (updateUserResult.error) {
      if (
        updateUserResult.error.code ===
        RedishError.Infrastructure.Codes.DATABASE_ERROR
      ) {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR);
      } else {
        response.status(HttpStatus.BAD_REQUEST);
      }
      return updateUserResult.error;
    }
    return updateUserResult.result!;
  }

  @ApiOkResponse({ type: UuidDto })
  @ApiNotFoundResponse({ type: RedishErrorDto })
  @UseGuards(AuthGuard)
  @Get()
  async getSelf(
    @Res({ passthrough: true }) response: Response,
    @Req() request: AuthenticatedRequest
  ): Promise<UserDto | RedishErrorDto> {
    return this.getUserById(response, request, request.userId);
  }

  @ApiOkResponse({ type: UuidDto })
  @ApiNotFoundResponse({ type: RedishErrorDto })
  @UseGuards(AuthGuard)
  @Get(':id')
  async getUserById(
    @Res({ passthrough: true }) response: Response,
    @Req() request: AuthenticatedRequest,
    @Param('id') id: string
  ): Promise<UserDto | RedishErrorDto> {
    const getUserByIdResult = await this.userFacade.getUserById(id);
    if (getUserByIdResult.error) {
      if (
        getUserByIdResult.error.code ===
        RedishError.Infrastructure.Codes.DATABASE_ERROR
      ) {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR);
      } else {
        response.status(HttpStatus.NOT_FOUND);
      }
      return getUserByIdResult.error;
    }
    return getUserByIdResult.result!;
  }

  @ApiInternalServerErrorResponse({ type: RedishErrorDto })
  @ApiUnauthorizedResponse({ type: RedishErrorDto })
  @UseGuards(AuthGuard)
  @Delete()
  async deleteUser(
    @Res({ passthrough: true }) response: Response,
    @Req() request: AuthenticatedRequest
  ): Promise<UuidDto | RedishErrorDto> {
    const deleteUserResult = await this.userFacade.deleteUser(request.userId);
    if (deleteUserResult.error) {
      if (
        deleteUserResult.error.code ===
        RedishError.Infrastructure.Codes.DATABASE_ERROR
      ) {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return deleteUserResult.error;
    }
    return deleteUserResult.result!;
  }
}
