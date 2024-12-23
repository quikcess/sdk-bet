import { z } from "zod";

export const isISODateString = (value: string) =>
	!Number.isNaN(Date.parse(value));

export const ISODateStringSchema = z
	.string()
	.refine(isISODateString, { message: "INVALID_ISO_DATE_STRING" });
