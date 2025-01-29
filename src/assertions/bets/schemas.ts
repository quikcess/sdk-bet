import {
	BetGelType,
	BetMode,
	BetPlatform,
	BetStatus,
	BetType,
} from "@quikcess/bet-api-types/v1";
import { z } from "zod";
import { NumericStringSchema } from "../common.js";

export const APIBetPlayerSchema = z.object({
	user_id: NumericStringSchema("user_id"),
	winner: z.boolean().nullable(),
});

export const APIBetLogSchema = z.object({
	created_url: z.string().nullable(),
	started_url: z.string().nullable(),
	victory_url: z.string().nullable(),
	closed_url: z.string().nullable(),
});

export const GuildBetBasicSchema = z.object({
	bet_id: z.string(),
	platform: z.nativeEnum(BetPlatform),
	format: z.string(),
	mode: z.nativeEnum(BetMode),
	status: z.nativeEnum(BetStatus),
	type: z.nativeEnum(BetType),
	room_id: z.number(),
	room_price: z.number(),
});

export const GuildBetPlayerSchema = z.object({
	players: z
		.array(APIBetPlayerSchema)
		.min(1, { message: "AT_LEAST_ONE_PLAYER_REQUIRED" })
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
	emulators: z.number(),
	gel_type: z.nativeEnum(BetGelType),
	gel_count: z.number(),
});

export const GuildBetOutcomeSchema = z.object({
	wo: z.boolean(),
	revenge: z.boolean(),
	cancelled_by: z.string().nullable(),
	abandoned_by: z.string().nullable(),
	given_up_by: z.string().nullable(),
});
