import { ScamStatus, ScamType } from "@quikcess/bet-api-types/v1";
import * as z from "zod";
import { ISODateStringSchema } from "#quikcess/utils/date/index";
import { createAssertion } from "./common";

const ScamSchema = z.object({
	guild_id: z.string().regex(/^\d+$/, "GUILD_ID_MUST_BE_NUMERICAL_STRING"),
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
	created_at: ISODateStringSchema,
	updated_at: ISODateStringSchema,
	validated_at: ISODateStringSchema.nullable().optional().default(null),
	validated_by: z.string().nullable().optional().default(null),
});

export const ScamSchemaPartial = ScamSchema.partial();

export const assertScam: (
	value: unknown,
	route?: string,
) => asserts value is z.infer<typeof ScamSchema> = createAssertion(
	ScamSchema,
	"SCAM",
	"/scam/?",
);

export const assertScams: (
	value: unknown,
	route?: string,
) => asserts value is z.infer<typeof ScamSchema>[] = createAssertion(
	ScamSchema.array(),
	"SCAM",
	"/scams/?",
);

export const assertPartialScam: (
	value: unknown,
	route?: string,
) => asserts value is z.infer<typeof ScamSchemaPartial> = createAssertion(
	ScamSchemaPartial,
	"SCAM",
	"/scam/?",
);
