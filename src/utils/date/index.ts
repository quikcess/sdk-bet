export const isISODateString = (value: string) =>
	!Number.isNaN(Date.parse(value));
