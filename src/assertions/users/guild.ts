import z from "zod";
import { ISODateStringSchema } from "#quikcess/utils/date";
import {
	UserNotificationsSchema,
	UserScoresSchema,
	UserWalletSchema,
} from "./schemas";
import { UserStatsSchema } from "./stats";

export const GuildUserSchema = z.object({
	user_id: z.string().regex(/^\d+$/, "USER_ID_MUST_BE_NUMERICAL_STRING"),
	guild_id: z.string().regex(/^\d+$/, "GUILD_ID_MUST_BE_NUMERICAL_STRING"),
	wallet: UserWalletSchema,
	stats: UserStatsSchema,
	scores: UserScoresSchema,
	notifications: UserNotificationsSchema,
	created_at: ISODateStringSchema,
	updated_at: ISODateStringSchema,
});

export const PartialGuildUserSchema = GuildUserSchema.partial();
