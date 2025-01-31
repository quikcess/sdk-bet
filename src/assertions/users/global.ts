import { EntityContextSchema, TimestampSchema } from "../common";
import { UserStatsSchema } from "./stats";

export const GlobalUserSchema = EntityContextSchema.omit({ guild_id: true })
	.extend({
		stats: UserStatsSchema,
	})
	.merge(TimestampSchema);

export const PartialGlobalUserSchema = GlobalUserSchema.partial();
