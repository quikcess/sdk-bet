/**
 * Converts the keys of an object from camelCase to snake_case.
 * @param obj The object whose keys should be converted.
 * @returns The new object with keys in snake_case.
 */
export function toSnakeCase<T, U>(obj: T): U {
	if (Array.isArray(obj)) {
		return obj.map(toSnakeCase) as unknown as any;
	}

	if (obj instanceof Date) {
		return obj.toISOString() as unknown as U;
	}

	if (obj && typeof obj === "object") {
		return Object.fromEntries(
			Object.entries(obj).map(([key, value]) => [
				key.replace(/([A-Z])/g, "_$1").toLowerCase(),
				value instanceof Date ? value.toISOString() : toSnakeCase(value),
			]),
		) as unknown as U;
	}

	return obj as unknown as U;
}
/**
 * Converts the keys of an object from snake_case to camelCase.
 * @param obj The object whose keys should be converted.
 * @returns The new object with keys in camelCase.
 */
export function toCamelCase<T, U>(obj: T): U {
	if (Array.isArray(obj)) {
		return obj.map(toCamelCase) as unknown as U;
	}

	if (obj && typeof obj === "object") {
		return Object.fromEntries(
			Object.entries(obj).map(([key, value]) => [
				key.replace(/(_\w)/g, (match) => match[1].toUpperCase()),
				toCamelCase(value),
			]),
		) as unknown as U;
	}

	return obj as unknown as U;
}
