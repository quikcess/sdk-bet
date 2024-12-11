import type * as z from "zod";
import type {
	APIObjectAssertionProps,
	LiteralAssertionProps,
} from "@/types/assertions";
import { BetAPIError } from "../structures";

export function assertLiteral({
	schema,
	value,
	expect,
	code,
}: LiteralAssertionProps) {
	try {
		schema.parse(value);
	} catch {
		throw new BetAPIError(
			code ? `INVALID_${code}` : "VALIDATION_ERROR",
			`Expect ${expect}, got ${typeof value}`,
		);
	}
}

export function assertAPIObject({
	schema,
	value,
	code,
	route,
}: APIObjectAssertionProps) {
	const name = code.toLowerCase().replaceAll("_", " ");

	try {
		schema.parse(value);
	} catch (err) {
		const cause = err.errors?.map((err: z.ZodIssue) => ({
			...err,
			path: err.path.join(" > "),
		}));

		throw new BetAPIError(
			`INVALID_API_${code}`,
			`Invalid ${name} object received from API ${route}`,
			{
				cause,
			},
		);
	}
}
