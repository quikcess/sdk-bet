import { parseDate } from "@/utils/date";
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
	gelType: z.nativeEnum(APIBetGelType),
	emulators: z.number(),
});

const APIBetPlayerBaseSchema = z.object({
	userId: z.string(),
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
	createdUrl: z.string(),
	startedUrl: z.string(),
	victoryUrl: z.string(),
	closedUrl: z.string(),
});

const APIBetFormatSchema = z.union([
	z.literal(APIBetFormat.Normal),
	z.literal(APIBetFormat.Tático),
	z.string(),
]);

const BetSchema = z.object({
	guildId: z.string(),
	betId: z.string(),
	platform: z.nativeEnum(APIBetPlatform),
	format: APIBetFormatSchema,
	mode: z.nativeEnum(APIBetMode),
	players: z.array(APIBetPlayerSchema),
	status: z.nativeEnum(APIBetStatus),
	type: z.nativeEnum(APIBetType),
	roomId: z.number(),
	value: z.number().or(z.string()),
	queueChannelId: z.string(),
	channelId: z.string(),
	mediatorId: z.string(),
	wo: z.boolean(),
	revenge: z.boolean(),
	emulators: z.number(),
	gelType: z.nativeEnum(APIBetGelType),
	createdAt: z.preprocess(
		parseDate,
		z.string().default(() => new Date().toISOString()),
	),
	updatedAt: z.preprocess(
		parseDate,
		z.string().default(() => new Date().toISOString()),
	),
	startedAt: z.preprocess(
		parseDate,
		z.string().default(() => new Date().toISOString()),
	),
	closedAt: z.preprocess(parseDate, z.string().or(z.null())),
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
