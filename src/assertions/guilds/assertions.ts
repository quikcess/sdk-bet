import type { z } from "zod";
import { createAssertion } from "../common.js";
import { GuildSchema, PartialGuildSchema } from "./guild.js";

// Assertions for guild
export const assertGuild: (
	value: unknown,
	route?: string,
) => asserts value is z.infer<typeof GuildSchema> = createAssertion(
	GuildSchema,
	"GUILD",
	"/guilds/?",
);

export const assertGuilds: (
	value: unknown,
	route?: string,
) => asserts value is z.infer<typeof GuildSchema>[] = createAssertion(
	GuildSchema.array(),
	"GUILDS",
	"/guilds/?",
);

export const assertPartialGuild: (
	value: unknown,
	route?: string,
) => asserts value is z.infer<typeof PartialGuildSchema> = createAssertion(
	PartialGuildSchema,
	"GUILD",
	"/guilds/?",
);
