import { EntityContextSchema, TimestampSchema } from "../common";
import {
	UserNotificationsSchema,
	UserScoresSchema,
	UserWalletSchema,
} from "./schemas";
import { UserStatsSchema } from "./stats";

export const GlobalUserSchema = EntityContextSchema.omit({ guild_id: true })
	.extend({
		wallet: UserWalletSchema,
		stats: UserStatsSchema,
		scores: UserScoresSchema,
		notifications: UserNotificationsSchema,
	})
	.merge(TimestampSchema);

export const PartialGlobalUserSchema = GlobalUserSchema.partial();
