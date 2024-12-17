import { isISODateString } from "@/utils/date";
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
	gel_count: z.number(),
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

export function assertBets(
  value: unknown[],
  route?: string,
): asserts value is z.infer<typeof BetSchema>[] {
  value.forEach((bet, index) => {
    assertAPIObject({
      schema: BetSchema,
      value: bet,
      code: "BET",
      route: route ? `${route}/${index}` : "/bets/?",
    });
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
