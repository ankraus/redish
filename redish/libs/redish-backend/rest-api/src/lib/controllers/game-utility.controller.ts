import {
  Controller,
  Get,
  HttpStatus,
  Injectable,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { RedishErrorDto } from '../dtos/redish-error.dto';
import { DictionaryFacade } from '@redish-backend/usecases';
import { AuthGuard } from '../guards/auth.guard';
import { RedishError } from '@redish-shared/domain';

@ApiTags('game-utility')
@Controller('game-utility')
@Injectable()
export class GameUtilityController {
  constructor(private dictionaryFacade: DictionaryFacade) {}

  @ApiOkResponse()
  @ApiBadRequestResponse({ type: RedishErrorDto })
  @ApiInternalServerErrorResponse({ type: RedishErrorDto })
  @UseGuards(AuthGuard)
  @Get('dictionary/:word')
  public async validate(
    @Res({ passthrough: true }) response: Response,
    @Param('word') word: string
  ): Promise<boolean | RedishErrorDto> {
    if (!word) {
      response.status(HttpStatus.BAD_REQUEST);
      return RedishError.Domain.badRequestError();
    }
    const validationResult = await this.dictionaryFacade.validate(word);
    if (validationResult.error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return validationResult.error;
    }
    return validationResult.result!;
  }
}
