import { ISODateStringSchema, isISODateString } from "@/utils/date/index";
import {
	BetGelType,
	BetMode,
	BetPlatform,
	BetStatus,
	BetType,
} from "@quikcess/bet-api-types/v1";
import { z } from "zod";
import { assertAPIObject } from "./common";

const APIBetPlayerSchema = z.object({
	user_id: z.string().regex(/^\d+$/, "USER_ID_MUST_BE_NUMERIC_STRING"),
	winner: z.boolean().or(z.null()),
});

const APIBetLogSchema = z.object({
	created_url: z.string().or(z.null()),
	started_url: z.string().or(z.null()),
	victory_url: z.string().or(z.null()),
	closed_url: z.string().or(z.null()),
});

const BetSchema = z.object({
	guild_id: z.string().regex(/^\d+$/, "GUILD_ID_MUST_BE_NUMERIC_STRING"),
	bet_id: z.string(),
	platform: z.nativeEnum(BetPlatform),
	format: z.string(),
	mode: z.nativeEnum(BetMode),
	players: z
		.array(APIBetPlayerSchema)
		.min(1, { message: "AT_LEAST_ONE_PLAYERS_REQUIRED" })
		.max(2, { message: "MAXIMUM_TWO_PLAYERS_ALLOWED" })
		.refine(
			(players) =>
				new Set(players.map((p) => p.user_id)).size === players.length,
			{ message: "DUPLICATE_USER_ID_FOUND" },
		),
	players_who_confirmed: z
		.array(z.string())
		.max(2, { message: "MAXIMUM_TWO_PLAYERS_ALLOWED" })
		.refine(
			(players) =>
				new Set(players.map((user_id) => user_id)).size === players.length,
			{ message: "DUPLICATE_USER_ID_FOUND" },
		),
	cancelled_by: z.string(z.null()),
	abandoned_by: z.string(z.null()),
	given_up_by: z.string(z.null()),
	status: z.nativeEnum(BetStatus),
	type: z.nativeEnum(BetType),
	room_id: z.number(),
	room_price: z.number(),
	value: z.union([
		z.number(),
		z
			.string()
			.regex(/^(\d+)(\/\d+){0,2}$/, "INVALID_VALUE_FORMAT")
			.refine(
				(str) => str.split("/").every((num) => !Number.isNaN(Number(num))),
				{ message: "INVALID_NUMBER_IN_STRING" },
			),
	]),
	queue_channel_id: z
		.string()
		.regex(/^\d+$/, "QUEUE_CHANNEL_ID_MUST_BE_NUMERIC_STRING"),
	channel_id: z.string().regex(/^\d+$/, "CHANNEL_ID_MUST_BE_NUMERIC_STRING"),
	mediator_id: z.string().regex(/^\d+$/, "MEDIATOR_ID_MUST_BE_NUMERIC_STRING"),
	wo: z.boolean(),
	revenge: z.boolean(),
	emulators: z.number(),
	gel_type: z.nativeEnum(BetGelType),
	gel_count: z.number(),
	created_at: ISODateStringSchema.default(() => new Date().toISOString()),
	updated_at: ISODateStringSchema.default(() => new Date().toISOString()),
	started_at: ISODateStringSchema.default(() => new Date().toISOString()),
	closed_at: z
		.string()
		.or(z.null())
		.refine((value) => value === null || isISODateString(value), {
			message: "INVALID_ISO_DATE_STRING",
		}),
	logs: APIBetLogSchema,
});

export function assertBet(
	value: unknown,
	route?: string,
): asserts value is z.infer<typeof BetSchema> {
	assertAPIObject({
		schema: BetSchema,
		value,
		code: "BET",
		route: route ?? "/bets/?",
	});
}

export function assertBets(
	value: unknown,
	route?: string,
): asserts value is z.infer<typeof BetSchema>[] {
	assertAPIObject({
		schema: BetSchema.array(),
		value,
		code: "BET",
		route: route ?? "/bets/?",
	});
}

export const BetSchemaPartial = BetSchema.partial();

export function assertPartialBet(
	value: unknown,
	route?: string,
): asserts value is z.infer<typeof BetSchemaPartial> {
	assertAPIObject({
		schema: BetSchemaPartial,
		value,
		code: "BET",
		route: route ?? "/bets/?",
	});
}
