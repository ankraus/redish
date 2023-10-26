import {
  Body,
  Controller,
  Get,
  Injectable,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationFacade } from '@redish-backend/usecases';
import { Result } from '@redish-backend/domain';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticateUserDto } from '../dtos/authenticate-user.dto';
import { TokenDto } from '../dtos/token.dto';
import { UuidDto } from '../dtos/uuid.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { AuthGuard } from '../guards/auth.guard';

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

  @ApiCreatedResponse({ type: Result<UuidDto> })
  @Post('register')
  async createUser(
    @Body() createUserDto: CreateUserDto
  ): Promise<Result<UuidDto>> {
    return this.authenticationFacade.createUser(createUserDto);
  }

  @Get('protected')
  @UseGuards(AuthGuard)
  async protectedRoute(): Promise<Result<string>> {
    return Result.success('Success');
  }
}
