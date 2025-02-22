import {
	BlacklistStatus,
	BlacklistTargetType,
} from "@quikcess/bet-api-types/v1";
import * as z from "zod";
import { ISODateStringSchema } from "#quikcess/utils/date";
import { createAssertion } from "./common";
import { deepPartialify } from "./deep";

const BlacklistSchema = z.object({
	guild_id: z.string().regex(/^\d+$/, "GUILD_ID_MUST_BE_NUMERICAL_STRING"),
	target_id: z.string().regex(/^\d+$/, "TARGET_ID_MUST_BE_NUMERICAL_STRING"),
	target_type: z.nativeEnum(BlacklistTargetType),
	status: z.nativeEnum(BlacklistStatus),
	added_by: z.string(),
	reason: z.string(),
	created_at: ISODateStringSchema,
	updated_at: ISODateStringSchema,
});

export const BlacklistSchemaPartial = deepPartialify(BlacklistSchema);

export const assertBlacklist: (
	value: unknown,
	route?: string,
) => asserts value is z.infer<typeof BlacklistSchema> = createAssertion(
	BlacklistSchema,
	"BLACKLIST",
	"/blacklist/?",
);

export const assertBlacklists: (
	value: unknown,
	route?: string,
) => asserts value is z.infer<typeof BlacklistSchema>[] = createAssertion(
	BlacklistSchema.array(),
	"BLACKLIST",
	"/blacklists/?",
);

export const assertPartialBlacklist: (
	value: unknown,
	route?: string,
) => asserts value is z.infer<typeof BlacklistSchemaPartial> = createAssertion(
	BlacklistSchemaPartial,
	"BLACKLIST",
	"/blacklist/?",
);
