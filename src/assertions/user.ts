import { ISODateStringSchema } from "@/utils/date/index.js";
import { z } from "zod";
import { assertAPIObject } from "./common.js";

const APIGuildUserScores = z.object({
	wins: z.number(),
	loses: z.number(),
	consecutives: z.number(),
});

const APIGuildUserWallet = z.object({
	credits: z.number(),
});

const APIGuildUserNotifications = z.object({
	events: z.boolean(),
	waiting_bets: z.boolean(),
});

const APIUserBilledRooms = z.object({
	purchased: z.number(), // Rooms purchased
	investment: z.number(), // Money invested
});

const APIGuildUserBilled = z.object({
	fee_only: z.number(),
	profit: z.number(),
	rooms: APIUserBilledRooms,
});

const APIGuildUserStats = z.object({
	total: z.number(),
	started: z.number(),
	closed: z.number(),
	pending: z.number(),
	in_progress: z.number(),
	confirmed: z.number(),
	cancelled: z.number(),
	abandoned: z.number(),
	played: z.number(),
	walkover: z.number(),
	revenged: z.number(),
	won: z.number(),
	lost: z.number(),
	billed: APIGuildUserBilled,
});

const UserSchema = z.object({
	user_id: z.string().regex(/^\d+$/, "USER_ID_MUST_BE_NUMERIC_STRING"),
	guild_id: z.string().regex(/^\d+$/, "GUILD_ID_MUST_BE_NUMERIC_STRING"),
	wallet: APIGuildUserWallet,
	stats: APIGuildUserStats,
	scores: APIGuildUserScores,
	notifications: APIGuildUserNotifications,
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
