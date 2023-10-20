import {Body, Controller, Get, Post} from '@nestjs/common';
import {AuthenticationFacade} from '@redish-backend/usecases';
import {GameReadDto} from '../dtos/game-read.dto';
import {IGame} from '@redish-shared/domain';
import {Authentication, Result, User} from '@redish-backend/domain';
import {firstValueFrom, take} from 'rxjs';
import {CreateUserDTO, UuidDTO} from '@redish-shared/domain';
import {ApiCreatedResponse, ApiOkResponse, ApiTags} from '@nestjs/swagger';



@ApiTags('auth')
@Controller('auth')
export class AuthenticationController {
  constructor(private authenticationFacade: AuthenticationFacade) { }

  @ApiOkResponse({type: [GameReadDto]})
  @Get()
  public async authenticateUser(): Promise<IGame> {
    // for example
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const newAuth = new Authentication();
    const result = await firstValueFrom(
      this.authenticationFacade.authenticateUser({}).pipe(take(1))
    );

    if (result.success) {
      // return result.result.hash;
      return new GameReadDto('sdf', '', 0, 1);
    }

    throw result.error;
  }

  @ApiCreatedResponse({type: Result<UuidDTO>})
  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDTO): Promise<Result<UuidDTO>> {
    return this.authenticationFacade.createUser(createUserDto);
  }
}
