import { z } from "zod";
import { assertAPIObject } from "./common";
import { APIBetStatus } from "@quikcess/bet-api-types/v1";

const BetSchema = z.object({
	guildId: z.string(),
	betId: z.string(),
	status: z.nativeEnum(APIBetStatus),
	createdAt: z.date().default(() => new Date()),
});

export function assertBet(
	value: unknown,
): asserts value is z.infer<typeof BetSchema> {
	assertAPIObject({
		schema: BetSchema,
		value,
		code: "BET",
		route: "/bets/create",
	});
}
