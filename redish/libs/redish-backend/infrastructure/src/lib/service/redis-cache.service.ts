import { get as getRedis } from '../RedisConnectionManager';

import { Result } from '@redish-backend/domain';
import { RedishError } from '@redish-shared/domain';

export class RedisCacheService {
  public async get(key: string): Promise<Result<boolean>> {
    try {
      const conn = await getRedis();
      if (!conn) {
        return Result.error(RedishError.Infrastructure.notInCacheError());
      }
      const res = await conn.get(key);
      if (res != null) {
        return Result.success(res === 'true');
      } else {
        return Result.error(RedishError.Infrastructure.notInCacheError());
      }
    } catch (err: unknown) {
      return Result.error(RedishError.Infrastructure.cacheError(err));
    }
  }

  public set(key: string, value: string) {
    const conn = getRedis();
    conn.then((client) => client.set(key, value));
  }
}
