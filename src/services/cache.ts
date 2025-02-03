import { LocalCache, type LocalCacheOptions } from "#quikcess/structures";

export class Cache<T> extends LocalCache<T, string> {
	constructor(options?: LocalCacheOptions) {
		super(
			options ?? {
				globalClearUp: 24 * 60 * 60 * 1000,
				autoClearUp: true,
			},
		);
	}
}
