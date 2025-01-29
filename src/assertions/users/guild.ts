import { EntityContextSchema, TimestampSchema } from "../common";
import {
	UserNotificationsSchema,
	UserScoresSchema,
	UserWalletSchema,
} from "./schemas";
import { UserStatsSchema } from "./stats";

export const GuildUserSchema = EntityContextSchema.extend({
	wallet: UserWalletSchema,
	stats: UserStatsSchema,
	scores: UserScoresSchema,
	notifications: UserNotificationsSchema,
}).merge(TimestampSchema);

export const PartialGuildUserSchema = GuildUserSchema.partial();
