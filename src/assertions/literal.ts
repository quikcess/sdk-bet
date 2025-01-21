import * as z from "zod";
import { assertLiteral } from "./common.js";

const StringSchema = z.coerce.string();

const BooleanSchema = z.coerce.boolean();

const ArraySchema = z.array(z.string());

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

export function assertArrayOfStrings(
	value: unknown,
	code?: string,
): asserts value is string[] {
	assertLiteral({
		schema: ArraySchema,
		expect: "array of strings",
		value,
		code,
	});
}
