import { Result } from '@redish-backend/domain';
import { DictionaryService } from '@redish-backend/usecases';
import { RedishError } from '@redish-shared/domain';
const URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

export class ExternalDictionaryService extends DictionaryService {
  override async validate(word: string): Promise<Result<boolean>> {
    try {
      const resp = await fetch(URL + word);
      if (resp.status == 200) {
        return Result.success(true);
      } else {
        return Result.success(false);
      }
    } catch (err: unknown) {
      return Result.error(RedishError.Domain.externalApiError(err));
    }
  }
}
