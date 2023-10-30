import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Injectable,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserFacade } from '@redish-backend/usecases';
import { Result } from '@redish-backend/domain';
import { AuthenticateUserDto } from '../dtos/authenticate-user.dto';
import { TokenDto } from '../dtos/token.dto';
import { UuidDto } from '../dtos/uuid.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
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
    } else {
      return authResult.result!;
    }
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
    } else {
      return createUserResult.result!;
    }
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
    } else {
      return updateUserResult.result!;
    }
  }

  // TODO remove example route
  @ApiBearerAuth()
  @Get('protected')
  @UseGuards(AuthGuard)
  async protectedRoute(): Promise<Result<string>> {
    return Result.success('Success');
  }
}
