import { z } from "zod";
import { EntityContextSchema, TimestampSchema } from "../common.js";
import {
	MediatorLimiterSchema,
	MediatorPixSchema,
	MediatorSignatureSchema,
} from "./schemas.js";
import { MediatorStatsSchema } from "./stats.js";

export const GuildMediatorSchema = EntityContextSchema.extend({
	category_id: z.string().nullable(),
	pix: MediatorPixSchema,
	virtual_accounts: z.number(),
	uptime: z.number(),
	last_entry: z.number().nullable(),
	signature: MediatorSignatureSchema,
	limiter: MediatorLimiterSchema,
	stats: MediatorStatsSchema,
}).merge(TimestampSchema);

export const PartialGuildMediatorSchema = GuildMediatorSchema.partial();
