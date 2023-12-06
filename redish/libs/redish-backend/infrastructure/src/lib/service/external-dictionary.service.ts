import { Result } from '@redish-backend/domain';
import { DictionaryService } from '@redish-backend/usecases';
import { RedishError } from '@redish-shared/domain';
import { RedisCacheService } from './redis-cache.service';
const URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

export class ExternalDictionaryService extends DictionaryService {
  private redisCacheService: RedisCacheService;
  constructor() {
    super();
    this.redisCacheService = new RedisCacheService();
  }

  override async validate(word: string): Promise<Result<boolean>> {
    const cacheResp = await this.redisCacheService.get(word);
    if (cacheResp.success) {
      return Result.success(cacheResp.result === 'true');
    }
    try {
      const resp = await fetch(URL + word);
      if (resp.status == 200) {
        this.redisCacheService.set(word, 'true');
        return Result.success(true);
      } else {
        this.redisCacheService.set(word, 'false');
        return Result.success(false);
      }
    } catch (err: unknown) {
      return Result.error(RedishError.Infrastructure.externalApiError(err));
    }
  }
}
