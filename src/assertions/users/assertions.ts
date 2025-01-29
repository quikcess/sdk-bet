import type { z } from "zod";
import { createAssertion } from "../common.js";
import { GlobalUserSchema, PartialGlobalUserSchema } from "./global.js";
import { GuildUserSchema, PartialGuildUserSchema } from "./guild.js";

// Assertions for guild users
export const assertGuildUser: (
	value: unknown,
	route?: string,
) => asserts value is z.infer<typeof GuildUserSchema> = createAssertion(
	GuildUserSchema,
	"GUILD_USER",
	"/guilds/users/?",
);

export const assertGuildUsers: (
	value: unknown,
	route?: string,
) => asserts value is z.infer<typeof GuildUserSchema>[] = createAssertion(
	GuildUserSchema.array(),
	"GUILD_USERS",
	"/guilds/users/?",
);

export const assertPartialGuildUser: (
	value: unknown,
	route?: string,
) => asserts value is z.infer<typeof PartialGuildUserSchema> = createAssertion(
	PartialGuildUserSchema,
	"GUILD_USER",
	"/guild/users/?",
);

// Assertions for global users
export const assertGlobalUser: (
	value: unknown,
	route?: string,
) => asserts value is z.infer<typeof GlobalUserSchema> = createAssertion(
	GlobalUserSchema,
	"GLOBAL_USER",
	"/users/?",
);

export const assertGlobalUsers: (
	value: unknown,
	route?: string,
) => asserts value is z.infer<typeof GlobalUserSchema>[] = createAssertion(
	GlobalUserSchema.array(),
	"GLOBAL_USERS",
	"/users/?",
);

export const assertPartialGlobalUser: (
	value: unknown,
	route?: string,
) => asserts value is z.infer<typeof PartialGlobalUserSchema> = createAssertion(
	PartialGlobalUserSchema,
	"GLOBAL_USER",
	"/users/?",
);
