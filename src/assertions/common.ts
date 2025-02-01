import type { z } from "zod";
import { BetSDKError } from "#quikcess/structures";
import type {
	APIObjectAssertionProps,
	LiteralAssertionProps,
} from "#quikcess/types/assertions";

export function createAssertion<T extends z.ZodTypeAny>(
	schema: T,
	code: string,
	defaultRoute: string,
) {
	return (value: unknown, route?: string): asserts value is z.infer<T> => {
		assertAPIObject({
			schema,
			value,
			code,
			route: route ?? defaultRoute,
		});
	};
}

export function assertLiteral({
	schema,
	value,
	expect,
	code,
}: LiteralAssertionProps) {
	try {
		schema.parse(value);
	} catch {
		throw new BetSDKError(
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

		throw new BetSDKError(
			`INVALID_API_${code}`,
			`Invalid ${name} object received from API ${route}`,
			{
				cause,
			},
		);
	}
}
