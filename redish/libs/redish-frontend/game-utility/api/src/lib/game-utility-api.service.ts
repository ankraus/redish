import { gameUtilityApiService } from '@redish-frontend/game-utility-data-access';
import { Result } from '@redish-shared/domain';

export function verify(word: string): Promise<Result<boolean>> {
  return gameUtilityApiService.verify(word);
}
