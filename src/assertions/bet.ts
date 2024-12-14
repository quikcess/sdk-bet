import { isISODateString } from "@/helpers/date";
import {
	APIBetFormat,
	APIBetGelType,
	APIBetMode,
	APIBetPlatform,
	APIBetStatus,
	APIBetType,
} from "@quikcess/bet-api-types/v1";
import { z } from "zod";
import { assertAPIObject } from "./common";

const APIBetPlayerDetailsSchema = z.object({
	gel_type: z.nativeEnum(APIBetGelType),
	emulators: z.number(),
});

const APIBetPlayerBaseSchema = z.object({
	user_id: z.string(),
	wins: z.number(),
	loses: z.number(),
	consecutives: z.number(),
});

const APIBetRegenerativePlayerSchema = APIBetPlayerBaseSchema.extend({
	details: APIBetPlayerDetailsSchema,
});

const APIBetCustomizedPlayerSchema = APIBetPlayerBaseSchema.extend({
	details: APIBetPlayerDetailsSchema.extend({
		platform: z.nativeEnum(APIBetPlatform),
	}),
});

const APIBetSpecializedPlayerSchema = APIBetPlayerBaseSchema.extend({
	details: APIBetPlayerDetailsSchema.extend({
		value: z.union([z.number(), z.string()]),
	}),
});

const APIBetPlayerSchema = z.union([
	APIBetRegenerativePlayerSchema,
	APIBetCustomizedPlayerSchema,
	APIBetSpecializedPlayerSchema,
]);

const APIBetLogSchema = z.object({
	created_url: z.string(),
	started_url: z.string(),
	victory_url: z.string(),
	closed_url: z.string(),
});

const APIBetFormatSchema = z.union([
	z.literal(APIBetFormat.Normal),
	z.literal(APIBetFormat.Tático),
	z.string(),
]);

const BetSchema = z.object({
	guild_id: z.string(),
	bet_id: z.string(),
	platform: z.nativeEnum(APIBetPlatform),
	format: APIBetFormatSchema,
	mode: z.nativeEnum(APIBetMode),
	players: z.array(APIBetPlayerSchema),
	status: z.nativeEnum(APIBetStatus),
	type: z.nativeEnum(APIBetType),
	room_id: z.number(),
	value: z.number().or(z.string()),
	queue_channel_id: z.string(),
	channel_id: z.string(),
	mediator_id: z.string(),
	wo: z.boolean(),
	revenge: z.boolean(),
	emulators: z.number(),
	gel_type: z.nativeEnum(APIBetGelType),
	created_at: z
		.string()
		.default(() => new Date().toISOString())
		.refine(isISODateString, { message: "INVALID_ISO_DATE_STRING" }),
	updated_at: z
		.string()
		.default(() => new Date().toISOString())
		.refine(isISODateString, { message: "INVALID_ISO_DATE_STRING" }),
	started_at: z
		.string()
		.default(() => new Date().toISOString())
		.refine(isISODateString, { message: "INVALID_ISO_DATE_STRING" }),
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
