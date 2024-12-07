import { BaseCacheService } from "./base";

export interface BetCache {
  readonly logs?: string;
}

export class BetCacheService extends BaseCacheService<BetCache> {
  protected cache: BetCache = {
    logs: undefined,
  };

  get logs() {
    return this.cache.logs;
  }
}
