import { EntityContextSchema, TimestampSchema } from "../common.js";
import {
	UserNotificationsSchema,
	UserScoresSchema,
	UserWalletSchema,
} from "./schemas.js";
import { UserStatsSchema } from "./stats.js";

export const GlobalUserSchema = EntityContextSchema.omit({ guild_id: true })
	.extend({
		wallet: UserWalletSchema,
		stats: UserStatsSchema,
		scores: UserScoresSchema,
		notifications: UserNotificationsSchema,
	})
	.merge(TimestampSchema);

export const PartialGlobalUserSchema = GlobalUserSchema.partial();
