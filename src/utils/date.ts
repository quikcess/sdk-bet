export const parseDate = (value: unknown) => {
	if (typeof value === "string") {
		const date = new Date(value);
		return Number.isNaN(date.getTime()) ? undefined : date;
	}
	return value;
};
