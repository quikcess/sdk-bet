import {
	BlacklistStatus,
	BlacklistTargetType,
} from "@quikcess/bet-api-types/v1";
import * as z from "zod";
import { ISODateStringSchema } from "#quikcess/utils/date/index";
import { NumericStringSchema, assertAPIObject } from "./common";

const BlacklistSchema = z.object({
	guild_id: NumericStringSchema("guild_id"),
	target_id: NumericStringSchema("target_id"),
	target_type: z.nativeEnum(BlacklistTargetType),
	status: z.nativeEnum(BlacklistStatus),
	added_by: z.string(),
	reason: z.string(),
	created_at: ISODateStringSchema.default(() => new Date().toISOString()),
	updated_at: ISODateStringSchema.default(() => new Date().toISOString()),
});

export function assertBlacklist(
	value: unknown,
	route?: string,
): asserts value is z.infer<typeof BlacklistSchema> {
	assertAPIObject({
		schema: BlacklistSchema,
		value,
		code: "BLACKLIST",
		route: route ?? "/blacklist/?",
	});
}

export const BlacklistSchemaPartial = BlacklistSchema.partial();

export function assertPartialBlacklist(
	value: unknown,
	route?: string,
): asserts value is z.infer<typeof BlacklistSchemaPartial> {
	assertAPIObject({
		schema: BlacklistSchemaPartial,
		value,
		code: "BLACKLIST",
		route: route ?? "/blacklist/?",
	});
}
