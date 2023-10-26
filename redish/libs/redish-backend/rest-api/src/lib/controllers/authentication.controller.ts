import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Injectable,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationFacade } from '@redish-backend/usecases';
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
} from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';
import { Response } from 'express';
import { RedishErrorDto } from '../dtos/redish-error.dto';
import { RedishError } from '@redish-shared/domain';

@ApiTags('auth')
@Controller('auth')
@Injectable()
export class AuthenticationController {
  constructor(private authenticationFacade: AuthenticationFacade) {}

  @ApiOkResponse()
  @Post('login')
  public async authenticateUser(
    @Body() authenticateUserDto: AuthenticateUserDto
  ): Promise<Result<TokenDto>> {
    return this.authenticationFacade.authenticateUser(authenticateUserDto);
  }

  @ApiCreatedResponse({ type: UuidDto })
  @ApiBadRequestResponse({ type: RedishErrorDto })
  @ApiInternalServerErrorResponse({ type: RedishErrorDto })
  @Post('register')
  async createUser(
    @Res() response: Response,
    @Body() createUserDto: CreateUserDto
  ): Promise<UuidDto | RedishErrorDto> {
    const createUserResult = await this.authenticationFacade.createUser(
      createUserDto
    );
    if (createUserResult.error) {
      if (
        createUserResult.error.code ===
        RedishError.Infrastructure.Codes.DATABASE_ERROR
      ) {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
      } else {
        response.status(HttpStatus.BAD_REQUEST).send();
      }
      return createUserResult.error;
    } else {
      return createUserResult.result!;
    }
  }

  @ApiBearerAuth()
  @Get('protected')
  @UseGuards(AuthGuard)
  async protectedRoute(): Promise<Result<string>> {
    return Result.success('Success');
  }
}
