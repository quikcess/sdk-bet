import * as fs from "fs";
import * as path from "path";

type FilterCondition<T> = {
	$eq?: T;
	$in?: T[];
	$nin?: T[];
	$elemMatch?: T extends Array<infer U>
		? { [K in keyof U]?: FilterCondition<U[K]> }
		: never;
};

interface Query<V> {
	filter: {
		[K in keyof V]?: FilterCondition<V[K]>;
	};
	fields?: (keyof V)[];
	options?: {
		sort?: Partial<Record<keyof V, 1 | -1>>;
		limit?: number;
		skip?: number;
	};
}

type LocalCacheType<V> = { data: V; archiveClearUp?: number };

export interface LocalCacheOptions {
	filePath?: string;
	globalClearUp?: number;
	autoClearUp?: boolean;
}

export class LocalCache<V, K extends string | number | symbol = string> {
	private data: Map<K, LocalCacheType<V>>;
	private filePath: string | null;
	private globalClearUp?: number;
	private clearupInterval: NodeJS.Timeout;
	private autoClearUp: boolean;

	constructor(options?: LocalCacheOptions) {
		this.data = new Map<K, LocalCacheType<V>>();
		this.filePath = options?.filePath ? path.resolve(options.filePath) : null;
		this.globalClearUp = options?.globalClearUp;
		this.autoClearUp = options?.autoClearUp ?? false;

		if (this.filePath) {
			this.loadFromFile();
		}

		this.clearupInterval = setInterval(() => this.clearExpiredFiles(), 10000);
	}

	/**
	 * Detroy clear up interval
	 */
	destroy() {
		clearInterval(this.clearupInterval);
	}

	/**
	 * Automatic cleanup of the data store
	 */
	private clearExpiredFiles() {
		const now = Date.now();
		for (const [key, value] of this.data) {
			if (value.archiveClearUp && value.archiveClearUp <= now) {
				this.delete(key);
			}
		}
	}

	/**
	 * Loads data from the specified filePath
	 */
	private loadFromFile(): void {
		if (!this.filePath) return;

		try {
			const fileContent = fs.readFileSync(this.filePath, "utf-8");
			const parsedData = JSON.parse(fileContent) as Record<K, V>;
			this.data = new Map(
				Object.entries(parsedData) as [K, LocalCacheType<V>][],
			);
		} catch (error) {
			if (error.code !== "ENOENT") {
				console.error("Failed to load data from file:", error);
			}
		}
	}

	/**
	 * Saves data to the specified filePath
	 */
	private saveToFile(): void {
		if (!this.filePath) return;

		try {
			const dataObject = Object.fromEntries(this.data);
			fs.writeFileSync(
				this.filePath,
				JSON.stringify(dataObject, null, 2),
				"utf-8",
			);
		} catch (error) {
			console.error("Failed to save data to file:", error);
		}
	}

	private calculateClearTime(cleanUpTime?: number) {
		return cleanUpTime ? Date.now() + cleanUpTime : undefined;
	}

	/**
	 * Adds or updates an item in the data store.
	 * Optionally, the updated data can be returned if `returnToObject` is set to `true`.
	 */
	batchCreate(entries: [K, V][], archiveClearUp?: number): void {
		for (const [key, value] of entries) {
			this.data.set(key, {
				data: value,
				archiveClearUp: this.calculateClearTime(
					archiveClearUp ?? this.globalClearUp,
				),
			});
		}
		this.saveToFile();
	}

	/**
	 * Sets or updates an item in the store
	 * Optionally returns the object if returnToObject is true
	 */
	set(
		key: K,
		value: V,
		options: { returnToObject: true; archiveClearUp?: number },
	): V;
	set(
		key: K,
		value: V,
		options?: { returnToObject?: false; archiveClearUp?: number },
	): null;
	set(
		key: K,
		value: V,
		options: { returnToObject?: boolean; archiveClearUp?: number } = {},
	): V | null {
		const LocalCache: LocalCacheType<V> = {
			data: value,
			archiveClearUp: this.calculateClearTime(
				options.archiveClearUp ?? this.globalClearUp,
			),
		};

		this.data.set(key, LocalCache);

		this.saveToFile();
		return options.returnToObject ? LocalCache.data : null;
	}

	/**
	 * Updates specific properties of an existing item in the store
	 * Optionally returns the updated object if returnToObject is true
	 */
	update(
		key: K,
		updates: Partial<V> | Record<string, unknown>,
		options: { returnToObject: true; archiveClearUp?: number },
	): V;
	update(
		key: K,
		updates: Partial<V> | Record<string, unknown>,
		options?: { returnToObject?: false; archiveClearUp?: number },
	): null;
	update(
		key: K,
		updates: Partial<V> | Record<string, unknown>,
		options: { returnToObject?: boolean; archiveClearUp?: number } = {},
	): V | null {
		const currentData = this.data.get(key);
		if (!currentData) return null;

		const updatedData = { ...currentData };
		for (const [path, value] of Object.entries(updates)) {
			this.deepSet(updatedData.data as Record<string, any>, path, value);
		}

		if (options.archiveClearUp || (this.autoClearUp && this.globalClearUp)) {
			updatedData.archiveClearUp = this.calculateClearTime(
				options.archiveClearUp ?? this.globalClearUp,
			);
		}

		this.data.set(key, updatedData);
		this.saveToFile();
		return options.returnToObject ? updatedData.data : null;
	}

	/**
	 * Deletes an item from the store
	 * Returns true if the item was deleted, otherwise false
	 */
	delete(key: K): boolean {
		const result = this.data.delete(key);
		this.saveToFile();
		return result;
	}

	/**
	 * Pushes values into an array at the specified path
	 * Optionally returns the updated object if returnToObject is true
	 */
	push(
		key: K,
		path: string,
		values: unknown | unknown[],
		options: { returnToObject: true; archiveClearUp?: number },
	): V;
	push(
		key: K,
		path: string,
		values: unknown | unknown[],
		options?: { returnToObject?: false; archiveClearUp?: number },
	): null;
	push(
		key: K,
		path: string,
		values: unknown | unknown[],
		options: { returnToObject?: boolean; archiveClearUp?: number } = {},
	): V | null {
		return this.modifyArray(key, path, "push", values, options);
	}

	/**
	 * Adds values to the beginning of an array at the specified path
	 * Optionally returns the updated object if returnToObject is true
	 */
	unshift(
		key: K,
		path: string,
		values: unknown | unknown[],
		options: { returnToObject: true; archiveClearUp?: number },
	): V;
	unshift(
		key: K,
		path: string,
		values: unknown | unknown[],
		options?: { returnToObject?: false; archiveClearUp?: number },
	): null;
	unshift(
		key: K,
		path: string,
		values: unknown | unknown[],
		options: { returnToObject?: boolean; archiveClearUp?: number } = {},
	): V | null {
		return this.modifyArray(key, path, "unshift", values, options);
	}

	/**
	 * Removes values from an array at the specified path
	 * Optionally returns the updated object if returnToObject is true
	 */
	pull(
		key: K,
		path: string,
		values: unknown | unknown[],
		options: { returnToObject: true; archiveClearUp?: number },
	): V;
	pull(
		key: K,
		path: string,
		values: unknown | unknown[],
		options?: { returnToObject?: false; archiveClearUp?: number },
	): null;
	pull(
		key: K,
		path: string,
		values: unknown | unknown[],
		options: { returnToObject?: boolean; archiveClearUp?: number } = {},
	): V | null {
		return this.modifyArray(key, path, "pull", values, options);
	}

	/**
	 * Adds unique values to an array at the specified path
	 * Optionally returns the updated object if returnToObject is true
	 */
	addToSet(
		key: K,
		path: string,
		values: unknown | unknown[],
		options: { returnToObject: true; archiveClearUp?: number },
	): V;
	addToSet(
		key: K,
		path: string,
		values: unknown | unknown[],
		options?: { returnToObject?: false; archiveClearUp?: number },
	): null;
	addToSet(
		key: K,
		path: string,
		values: unknown | unknown[],
		options: { returnToObject?: boolean; archiveClearUp?: number } = {},
	): V | null {
		return this.modifyArray(key, path, "addToSet", values, options);
	}

	/**
	 * Modifies an array at a specified path within an object
	 */
	private modifyArray(
		key: K,
		path: string,
		operation: "push" | "unshift" | "addToSet" | "pull",
		values: unknown | unknown[],
		options: { returnToObject?: boolean; archiveClearUp?: number } = {},
	): V | null {
		const currentData = this.data.get(key);
		if (!currentData) return null;

		const updatedData = { ...currentData };
		const array = this.deepGet(updatedData, path) || [];

		if (!Array.isArray(array))
			throw new Error(`Path "${path}" is not an array.`);

		let newArray: unknown[];

		switch (operation) {
			case "push":
				newArray = [...array, ...(Array.isArray(values) ? values : [values])];
				break;
			case "unshift":
				newArray = [...(Array.isArray(values) ? values : [values]), ...array];
				break;
			case "addToSet":
				newArray = [
					...new Set([
						...array,
						...(Array.isArray(values) ? values : [values]),
					]),
				];
				break;
			case "pull":
				newArray = array.filter(
					(item) => !(Array.isArray(values) ? values : [values]).includes(item),
				);
				break;
			default:
				throw new Error(`Invalid operation: "${operation}"`);
		}

		if (options.archiveClearUp || (this.autoClearUp && this.globalClearUp)) {
			updatedData.archiveClearUp = this.calculateClearTime(
				options.archiveClearUp ?? this.globalClearUp,
			);
		}

		this.deepSet(updatedData, path, newArray);
		this.data.set(key, updatedData);
		this.saveToFile();

		return options.returnToObject ? updatedData.data : null;
	}

	/**
	 * Recursively sets a value at a nested path within an object
	 */
	private deepSet(
		obj: Record<string, any>,
		path: string,
		value: unknown,
	): void {
		const keys = path.split(".");
		let current = obj;

		for (let i = 0; i < keys.length - 1; i++) {
			const key = keys[i];
			if (
				!(key in current) ||
				typeof current[key] !== "object" ||
				current[key] === null
			) {
				current[key] = {};
			}
			current = current[key];
		}

		current[keys[keys.length - 1]] = value;
	}

	/**
	 * Retrieves a value at a nested path within an object
	 */
	private deepGet(obj: Record<string, any>, path: string): unknown {
		return path.split(".").reduce((acc, key) => acc?.[key], obj);
	}

	/**
	 * Find the first item matching the filter.
	 */
	findOne(query: Query<V>): V | null {
		const { filter, fields, options } = query;

		const results = this.find({ filter, fields });

		// Apply sorting in `findOne`
		if (options?.sort) {
			const [sortField, sortOrder] = Object.entries(options.sort)[0] as [
				keyof V,
				1 | -1,
			];
			results.sort((a, b) => {
				const aValue = a[sortField] ?? 0;
				const bValue = b[sortField] ?? 0;
				if (aValue > bValue) return sortOrder;
				if (aValue < bValue) return -sortOrder;
				return 0;
			});
		}

		return results[0] ?? null;
	}

	/**
	 * Find all items based on a dynamic filter.
	 */
	find(query: Query<V>): V[] {
		const { filter, fields, options } = query;
		const results: V[] = [];

		for (const item of this.data.values()) {
			let match = true;

			for (const [key, condition] of Object.entries(filter)) {
				const field = item.data[key as keyof V];
				const cond = condition as FilterCondition<typeof field>;

				if (Array.isArray(field)) {
					if ("$elemMatch" in cond) {
						const elemMatchCond = cond.$elemMatch as Record<string, any>;
						const isMatch = field.some((subItem) => {
							for (const [subKey, subCond] of Object.entries(elemMatchCond)) {
								const subValue = (subItem as Record<string, any>)[subKey];
								if (!this.checkCondition(subValue, subCond)) {
									return false;
								}
							}
							return true;
						});
						if (!isMatch) {
							match = false;
							break;
						}
					} else {
						if (!this.checkCondition(field, cond)) {
							match = false;
							break;
						}
					}
				} else {
					if (!this.checkCondition(field, cond)) {
						match = false;
						break;
					}
				}
			}

			if (match) {
				results.push(fields ? this.project(item.data, fields) : item.data);
			}
		}

		this.applyOptions(results, options);
		return results;
	}

	shift(deleteData = true): V | undefined {
		if (this.size === 0) {
			return undefined;
		}

		const firstKey = Array.from(this.data.keys())[0];

		if (firstKey !== undefined) {
			const value = this.data.get(firstKey);

			this.data.delete(firstKey);

			if (this.filePath && deleteData) {
				this.saveToFile();
			}

			return value?.data;
		}

		return undefined;
	}

	pop(deleteData = true): V | undefined {
		if (this.size === 0) {
			return undefined;
		}

		const lastKey = Array.from(this.data.keys()).pop();

		if (lastKey !== undefined) {
			const value = this.data.get(lastKey);

			this.data.delete(lastKey);

			if (this.filePath && deleteData) {
				this.saveToFile();
			}

			return value?.data;
		}

		return undefined;
	}

	private checkCondition<T>(value: T, condition: FilterCondition<T>): boolean {
		if (condition.$eq !== undefined) {
			return JSON.stringify(value) === JSON.stringify(condition.$eq);
		}
		if (condition.$in) {
			return condition.$in.some(
				(c) => JSON.stringify(value) === JSON.stringify(c),
			);
		}
		if (condition.$nin) {
			return !condition.$nin.some(
				(c) => JSON.stringify(value) === JSON.stringify(c),
			);
		}
		if (
			typeof condition === "object" &&
			condition !== null &&
			!Array.isArray(condition)
		) {
			return JSON.stringify(value) === JSON.stringify(condition);
		}
		return JSON.stringify(value) === JSON.stringify(condition);
	}

	private project(data: V, fields: (keyof V)[]): V {
		const result: Partial<V> = {};
		for (const key of fields) {
			result[key] = data[key];
		}
		return result as V;
	}

	private applyOptions(results: V[], options?: Query<V>["options"]) {
		if (options?.sort) {
			const [sortKey, sortOrder] = Object.entries(options.sort)[0] as [
				keyof V,
				1 | -1,
			];
			results.sort((a, b) => {
				const aVal = a[sortKey];
				const bVal = b[sortKey];
				return aVal > bVal ? sortOrder : aVal < bVal ? -sortOrder : 0;
			});
		}
		if (options?.skip) results.splice(0, options.skip);
		if (options?.limit) results.splice(options.limit);
	}

	/**
	 * Retrieves an item from the store
	 */
	get(key: K): V | undefined {
		return this.data.get(key)?.data;
	}

	/**
	 * Retrieves all items from the store as an array of key-value pairs
	 */
	getAll(): [K, V][] {
		return Array.from(this.data.entries()).map(([key, value]) => {
			return [key, value.data];
		});
	}

	/**
	 * Checks if a key exists in the store
	 */
	has(key: K): boolean {
		return this.data.has(key);
	}

	/**
	 * Converts all stored items to a simple object
	 */
	toObject(): Record<K, V> {
		return Object.fromEntries(
			Array.from(this.data.entries()).map(([key, value]) => [key as K, value]),
		) as Record<K, V>;
	}

	/**
	 * Clears all items from the store
	 */
	clear(): void {
		this.data.clear();
	}

	/**
	 * Retrieves all keys from the store
	 */
	keys(): K[] {
		return Array.from(this.data.keys());
	}

	/**
	 * Retrieves all values from the store
	 */
	values(): V[] {
		return Array.from(this.data.values()).map((v) => v.data);
	}

	/**
	 * Retrieves the number of items in the store
	 */
	get size(): number {
		return this.data.size;
	}
}
