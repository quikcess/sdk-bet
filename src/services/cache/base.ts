import { Collection } from "@/structures/collection";

export class Cache<T> {
	private readonly store: Collection<string, T>;

	constructor() {
		this.store = new Collection();
	}

	get(id: string): T | undefined {
		return this.store.get(id);
	}

	set(id: string, value: T): void {
		this.store.set(id, value);
	}

	remove(id: string): void {
		this.store.delete(id);
	}

	clear(): void {
		this.store.clear();
	}

	has(id: string): boolean {
		return this.store.has(id);
	}

	size(): number {
		return this.store.size;
	}
}
