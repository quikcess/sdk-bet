import { z } from "zod";
import { ISODateStringSchema } from "#quikcess/utils/date";
import { deepPartialify } from "../deep";
import {
	MediatorLimiterSchema,
	MediatorPixSchema,
	MediatorSignatureSchema,
} from "./schemas";
import { MediatorStatsSchema } from "./stats";

export const GuildMediatorSchema = z.object({
	user_id: z.string().regex(/^\d+$/, "USER_ID_MUST_BE_NUMERICAL_STRING"),
	guild_id: z.string().regex(/^\d+$/, "GUILD_ID_MUST_BE_NUMERICAL_STRING"),
	category_id: z.string().nullable(),
	pix: MediatorPixSchema,
	virtual_accounts: z.number(),
	uptime: z.number(),
	last_entry: z.number().nullable(),
	signature: MediatorSignatureSchema,
	limiter: MediatorLimiterSchema,
	stats: MediatorStatsSchema,
	created_at: ISODateStringSchema,
	updated_at: ISODateStringSchema,
});

export const PartialGuildMediatorSchema = deepPartialify(GuildMediatorSchema);
