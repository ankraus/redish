import { Injectable } from '@nestjs/common';
import { Result } from '@redish-backend/domain';
import { ConfigurationService } from '@redish-backend/shared';
import { DictionaryService } from '@redish-backend/usecases';
import { RedishError } from '@redish-shared/domain';
@Injectable()
export class ExternalDictionaryService extends DictionaryService {
  private url: string;
  constructor(configService: ConfigurationService) {
    super();
    this.url = configService.getDictionaryConfig().url;
  }

  override async validate(word: string): Promise<Result<boolean>> {
    try {
      const resp = await fetch(this.url + word);
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
