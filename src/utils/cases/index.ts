/**
 * Converts the keys of an object from camelCase to snake_case.
 * @param obj The object whose keys should be converted.
 * @returns The new object with keys in snake_case.
 */
export function toSnakeCase<T>(obj: T): any {
	if (Array.isArray(obj)) {
		return obj.map(toSnakeCase);
	}

	if (obj && typeof obj === "object") {
		return Object.fromEntries(
			Object.entries(obj).map(([key, value]) => [
				key.replace(/([A-Z])/g, "_$1").toLowerCase(),
				toSnakeCase(value),
			]),
		);
	}

	return obj;
}

/**
 * Converts the keys of an object from snake_case to camelCase.
 * @param obj The object whose keys should be converted.
 * @returns The new object with keys in camelCase.
 */
export function toCamelCase<T>(obj: T): any {
	if (Array.isArray(obj)) {
		return obj.map(toCamelCase);
	}

	if (obj && typeof obj === "object") {
		return Object.fromEntries(
			Object.entries(obj).map(([key, value]) => [
				key.replace(/(_\w)/g, (match) => match[1].toUpperCase()),
				toCamelCase(value),
			]),
		);
	}

	return obj;
}
