import { ScamStatus, ScamType } from "@quikcess/bet-api-types/v1";
import * as z from "zod";
import { ISODateStringSchema } from "#quikcess/utils/date/index";
import { NumericStringSchema, assertAPIObject } from "./common";

const ScamSchema = z.object({
	guild_id: NumericStringSchema("guild_id"),
	target_name: z
		.string()
		.min(2, "TARGET_NAME_TOO_SHORT")
		.max(50, "TARGET_NAME_TOO_LONG")
		.regex(/^[^\d]+$/, "TARGET_NAME_MUST_NOT_CONTAIN_NUMBERS")
		.regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ' -]+$/, "TARGET_NAME_CONTAINS_INVALID_CHARACTERS")
		.trim(),
	type: z.nativeEnum(ScamType),
	status: z.nativeEnum(ScamStatus),
	details: z.string(),
	reported_by: z.string(),
	evidences: z.array(z.string()),
	created_at: ISODateStringSchema.default(() => new Date().toISOString()),
	updated_at: ISODateStringSchema.default(() => new Date().toISOString()),
	validated_at: ISODateStringSchema.nullable().optional().default(null),
	validated_by: z.string().nullable().optional().default(null),
});

export function assertScam(
	value: unknown,
	route?: string,
): asserts value is z.infer<typeof ScamSchema> {
	assertAPIObject({
		schema: ScamSchema,
		value,
		code: "SCAM",
		route: route ?? "/scam/?",
	});
}

export const ScamSchemaPartial = ScamSchema.partial();

export function assertPartialScam(
	value: unknown,
	route?: string,
): asserts value is z.infer<typeof ScamSchemaPartial> {
	assertAPIObject({
		schema: ScamSchemaPartial,
		value,
		code: "SCAM",
		route: route ?? "/scam/?",
	});
}
