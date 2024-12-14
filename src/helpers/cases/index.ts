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
