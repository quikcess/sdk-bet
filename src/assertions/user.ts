import { ISODateStringSchema } from "@/utils/date/index.js";
import { z } from "zod";
import { assertAPIObject } from "./common.js";

const APIUserScores = z.object({
	wins: z.number(),
	loses: z.number(),
	consecutives: z.number(),
});

const APIUserWallet = z.object({
	credits: z.number(),
});

const APIUserNotifications = z.object({
	events: z.boolean(),
	waiting_bets: z.boolean(),
});

const APIUserBilledRooms = z.object({
	purchased: z.number(), // Rooms purchased
	investment: z.number(), // Money invested
});

const APIUserBilled = z.object({
	fee_only: z.number(),
	profit: z.number(),
	rooms: APIUserBilledRooms,
});

const APIUserStats = z.object({
	total: z.number(),
	started_bets: z.number(),
	closed_bets: z.number(),
	pending_bets: z.number(),
	in_progress_bets: z.number(),
	confirmed_bets: z.number(),
	cancelled_bets: z.number(),
	abandoned_bets: z.number(),
	played_bets: z.number(),
	walkover_bets: z.number(),
	revenged_bets: z.number(),
	won_bets: z.number(),
	lost_bets: z.number(),
	billed: APIUserBilled,
});

const UserSchema = z.object({
	user_id: z.string().regex(/^\d+$/, "USER_ID_MUST_BE_NUMERIC_STRING"),
	guild_id: z.string().regex(/^\d+$/, "GUILD_ID_MUST_BE_NUMERIC_STRING"),
	wallet: APIUserWallet,
	stats: APIUserStats,
	scores: APIUserScores,
	notifications: APIUserNotifications,
	created_at: ISODateStringSchema.default(() => new Date().toISOString()),
	updated_at: ISODateStringSchema.default(() => new Date().toISOString()),
});

export function assertUser(
	value: unknown,
	route?: string,
): asserts value is z.infer<typeof UserSchema> {
	assertAPIObject({
		schema: UserSchema,
		value,
		code: "USER",
		route: route ?? "/users/?",
	});
}

export function assertUsers(
	value: unknown,
	route?: string,
): asserts value is z.infer<typeof UserSchema>[] {
	assertAPIObject({
		schema: UserSchema.array(),
		value,
		code: "USER",
		route: route ?? "/users/?",
	});
}

export const UserSchemaPartial = UserSchema.partial();

export function assertPartialUser(
	value: unknown,
	route?: string,
): asserts value is z.infer<typeof UserSchemaPartial> {
	assertAPIObject({
		schema: UserSchemaPartial,
		value,
		code: "USER",
		route: route ?? "/users/?",
	});
}
