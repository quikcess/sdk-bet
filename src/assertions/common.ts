import { BetSDKError } from "@/structures/error.js";
import type {
	APIObjectAssertionProps,
	LiteralAssertionProps,
} from "@/types/assertions";
import { z } from "zod";

export const NumericStringSchema = (locale: string) =>
	z.string().regex(/^\d+$/, `${locale.toUpperCase()}_MUST_BE_NUMERICAL_STRING`);

export const ISODateStringSchema = z
	.string()
	.refine((value: string) => !Number.isNaN(Date.parse(value)), {
		message: "INVALID_ISO_DATE_STRING",
	});

export const TimestampSchema = z.object({
	created_at: ISODateStringSchema.default(() => new Date().toISOString()),
	updated_at: ISODateStringSchema.default(() => new Date().toISOString()),
});

export const EntityContextSchema = z.object({
	user_id: NumericStringSchema("user_id"),
	guild_id: NumericStringSchema("guild_id"),
});

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
