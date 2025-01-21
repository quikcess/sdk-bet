import { BaseCacheService } from "./base.js";

export interface GlobalCache {
	readonly betsCount?: number;
}

export class GlobalCacheService extends BaseCacheService<GlobalCache> {
	protected cache: GlobalCache = {
		betsCount: undefined,
	};

	get betsCount() {
		return this.cache.betsCount;
	}
}
