import { ISODateStringSchema, isISODateString } from "@/utils/date";
import {
  APIBetGelType,
  APIBetMode,
  APIBetPlatform,
  APIBetStatus,
  APIBetType,
} from "@quikcess/bet-api-types/v1";
import { z } from "zod";
import { assertAPIObject } from "./common";

const APIBetPlayerSchema = z.object({
	user_id: z.string(),
	wins: z.number(),
	loses: z.number(),
	consecutives: z.number(),
});

const APIBetLogSchema = z.object({
	created_url: z.string(),
	started_url: z.string(),
	victory_url: z.string(),
	closed_url: z.string(),
});

const BetSchema = z.object({
	guild_id: z.string(),
	bet_id: z.string(),
	platform: z.nativeEnum(APIBetPlatform),
	format: z.string(),
	mode: z.nativeEnum(APIBetMode),
	players: z
		.array(APIBetPlayerSchema)
		.min(1, { message: "AT_LEAST_ONE_PLAYERS_REQUIRED" })
		.max(2, { message: "MAXIMUM_TWO_PLAYERS_ALLOWED" })
		.refine(
			(players) =>
				new Set(players.map((p) => p.user_id)).size === players.length,
			{ message: "DUPLICATE_USER_ID_FOUND" },
		),
	status: z.nativeEnum(APIBetStatus),
	type: z.nativeEnum(APIBetType),
	room_id: z.number(),
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

	queue_channel_id: z.string(),
	channel_id: z.string(),
	mediator_id: z.string(),
	wo: z.boolean(),
	revenge: z.boolean(),
	emulators: z.number(),
	gel_type: z.nativeEnum(APIBetGelType),
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
