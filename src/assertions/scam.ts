import { ISODateStringSchema } from "@/utils/date/index";
import { ScamStatus, ScamType } from "@quikcess/bet-api-types/v1";
import * as z from "zod";
import { assertAPIObject } from "./common";

const ScamSchema = z.object({
	guild_id: z.string().regex(/^\d+$/, "GUILD_ID_MUST_BE_NUMERIC_STRING"),
	target_name: z
		.string()
		.regex(/^[^\d]+$/, "TARGET_NAME_MUST_NOT_CONTAIN_NUMBERS"),
	type: z.nativeEnum(ScamType),
	status: z.nativeEnum(ScamStatus),
	details: z.string(),
	reported_by: z.string(),
	evidences: z.array(z.string()),
	created_at: ISODateStringSchema.default(() => new Date().toISOString()),
	updated_at: ISODateStringSchema.default(() => new Date().toISOString()),
	validated_at: ISODateStringSchema.optional(),
	validated_by: z.string().optional(),
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
