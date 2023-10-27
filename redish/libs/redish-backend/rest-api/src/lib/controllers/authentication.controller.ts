import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationFacade } from '@redish-backend/usecases';
import { Result } from '@redish-backend/domain';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticateUserDto } from '../dtos/authenticate-user.dto';
import { JwtDto } from '../dtos/jwt.dto';
import { UuidDto } from '../dtos/uuid.dto';
import { CreateUserDto } from '../dtos/create-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthenticationController {
  constructor(private authenticationFacade: AuthenticationFacade) {}

  @ApiOkResponse()
  @Post('login')
  public async authenticateUser(
    @Body() authenticateUserDto: AuthenticateUserDto
  ): Promise<Result<JwtDto>> {
    return this.authenticationFacade.authenticateUser(authenticateUserDto);
  }

  @ApiCreatedResponse({ type: Result<UuidDto> })
  @Post('register')
  async createUser(
    @Body() createUserDto: CreateUserDto
  ): Promise<Result<UuidDto>> {
    return this.authenticationFacade.createUser(createUserDto);
  }
}
