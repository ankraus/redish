import { Injectable } from '@nestjs/common';
import { Result } from '@redish-backend/domain';
import { ConfigurationService } from '@redish-backend/shared';
import { DictionaryService } from '@redish-backend/usecases';
import { RedishError } from '@redish-shared/domain';
import { CacheService } from './cache.service';
@Injectable()
export class ExternalDictionaryService extends DictionaryService {
  private url: string;

  constructor(
    configService: ConfigurationService,
    private cacheService: CacheService
  ) {
    super();
    this.url = configService.getDictionaryConfig().url;
  }

  override async validate(word: string): Promise<Result<boolean>> {
    const cacheResp = await this.cacheService.get(word);
    if (cacheResp.success) {
      return Result.success(cacheResp.result === 'true');
    }
    try {
      const resp = await fetch(this.url + word);
      if (resp.status == 200) {
        this.cacheService.set(word, 'true');
        return Result.success(true);
      } else {
        this.cacheService.set(word, 'false');
        return Result.success(false);
      }
    } catch (err: unknown) {
      return Result.error(RedishError.Infrastructure.externalApiError(err));
    }
  }
}
