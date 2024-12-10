import * as z from "zod";

import { assertLiteral } from "./common";

const StringSchema = z.coerce.string();

const BooleanSchema = z.coerce.boolean();

export function assertString(
	value: unknown,
	code?: string,
): asserts value is string {
	assertLiteral({
		schema: StringSchema,
		expect: "string",
		value,
		code,
	});
}

export function assertBoolean(
	value: unknown,
	code?: string,
): asserts value is boolean {
	assertLiteral({
		schema: BooleanSchema,
		expect: "boolean",
		value,
		code,
	});
}
