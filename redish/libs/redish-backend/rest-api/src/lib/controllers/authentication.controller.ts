import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticationFacade } from '@redish-backend/usecases';
import { GameReadDto } from '../dtos/game-read.dto';
import { IGame } from '@redish-shared/domain';
import { Authentication } from '@redish-backend/domain';
import { firstValueFrom, take } from 'rxjs';

@ApiTags('auth')
@Controller('auth')
export class AuthenticationController {
  constructor(private authenticationFacade: AuthenticationFacade) {}

  @ApiOkResponse({ type: [GameReadDto] })
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
}
