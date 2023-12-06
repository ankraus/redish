import { Injectable } from '@nestjs/common';
import { Result } from '@redish-backend/domain';
import { DictionaryService } from './interfaces/dictionary.service';

@Injectable()
export class DictionaryFacade {
  constructor(private _dictionaryService: DictionaryService) {}

  public validate(word: string): Promise<Result<boolean>> {
    return this._dictionaryService.validate(word);
  }
}
