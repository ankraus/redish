import {Result} from "@redish-backend/domain";

export abstract class CacheService {
  abstract get(key: string): Promise<Result<string>>;
  abstract set(key: string, value: string): void;
}