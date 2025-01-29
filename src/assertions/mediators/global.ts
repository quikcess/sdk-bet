import { z } from "zod";
import { EntityContextSchema, TimestampSchema } from "../common";
import { MediatorStatsSchema } from "./stats";

export const GlobalMediatorSchema = EntityContextSchema.omit({ guild_id: true })
	.extend({
		uptime: z.number(),
		last_entry: z.number().nullable(),
		stats: MediatorStatsSchema,
	})
	.merge(TimestampSchema);

export const PartialGlobalMediatorSchema = GlobalMediatorSchema.partial();
