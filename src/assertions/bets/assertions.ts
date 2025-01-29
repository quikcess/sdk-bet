import type { z } from "zod";
import { createAssertion } from "../common.js";
import { GuildBetSchema, PartialGuildBetSchema } from "./guild.js";

// Assertions for guild Bets
export const assertGuildBet: (
	value: unknown,
	route?: string,
) => asserts value is z.infer<typeof GuildBetSchema> = createAssertion(
	GuildBetSchema,
	"GUILD_BET",
	"/guilds/bets/?",
);

export const assertGuildBets: (
	value: unknown,
	route?: string,
) => asserts value is z.infer<typeof GuildBetSchema>[] = createAssertion(
	GuildBetSchema.array(),
	"GUILD_BET",
	"/guilds/bets/?",
);

export const assertPartialGuildBet: (
	value: unknown,
	route?: string,
) => asserts value is z.infer<typeof PartialGuildBetSchema> = createAssertion(
	PartialGuildBetSchema,
	"GUILD_BET",
	"/guilds/bets/?",
);
