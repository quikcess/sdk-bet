import { Collection } from "#quikcess/structures/collection";

export class Cache<T> extends Collection<string, T> {
	private readonly store: Collection<string, T>;

	constructor() {
		super();
		this.store = new Collection();
	}
}
