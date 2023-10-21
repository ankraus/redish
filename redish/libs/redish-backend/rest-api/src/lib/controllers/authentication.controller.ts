import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationFacade } from '@redish-backend/usecases';
import { AuthenticateUserDTO, CreateUserDTO, UuidDTO } from '@redish-shared/domain';
import { Result } from '@redish-backend/domain';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthenticationController {
  constructor(private authenticationFacade: AuthenticationFacade) {}

  @ApiOkResponse()
  @Post('login')
  public async authenticateUser(
    @Body() authenticateUserDto: AuthenticateUserDTO
  ): Promise<Result<UuidDTO>> {
    // this will be expaneded upon with JWT
    // for now, only the uuid will be returned if login was successful

    return this.authenticationFacade.authenticateUser(authenticateUserDto);
  }

  @ApiCreatedResponse({ type: Result<UuidDTO> })
  @Post('register')
  async createUser(
    @Body() createUserDto: CreateUserDTO
  ): Promise<Result<UuidDTO>> {
    return this.authenticationFacade.createUser(createUserDto);
  }
}
