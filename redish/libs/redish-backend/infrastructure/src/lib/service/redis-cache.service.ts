import { Result } from '@redish-backend/domain';
import { RedishError } from '@redish-shared/domain';
import type { RedisClientType } from 'redis';
import { createClient } from 'redis';

export class RedisCacheService {
  private client?: RedisClientType;
  private connected = false;

  public async get(key: string): Promise<Result<string>> {
    const conn = await this.getRedisClient();
    if (!conn.success) {
      return Result.error(conn.error!);
    }
    try {
      const res = await conn.result!.get(key);
      if (res != null) {
        return Result.success(res);
      } else {
        return Result.error(RedishError.Infrastructure.notInCacheError());
      }
    } catch (err: unknown) {
      return Result.error(RedishError.Infrastructure.cacheError(err));
    }
  }

  public set(key: string, value: string): void {
    const conn = this.getRedisClient();
    conn.then((client) => client.result?.set(key, value));
  }

  private async getRedisClient(): Promise<Result<RedisClientType>> {
    if (!this.connected) {
      try {
        this.client = createClient();
        //client.on('error', (err) => console.error(`Cache Error: ${err}`));
        //client.on('connect', () => console.log('Cache connecting'));
        //client.on('reconnecting', () => console.log('Cache reconnecting'));
        this.client.on('ready', () => {
          this.connected = true;
          console.log('Cache connected!');
        });
        await this.client.connect();
      } catch (err) {
        return Result.error(RedishError.Infrastructure.cacheError(err));
      }
    }
    return Result.success(this.client);
  }
}
