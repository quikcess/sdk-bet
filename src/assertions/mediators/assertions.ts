import type { z } from "zod";
import { createAssertion } from "../common.js";
import { GlobalMediatorSchema, PartialGlobalMediatorSchema } from "./global.js";
import { GuildMediatorSchema, PartialGuildMediatorSchema } from "./guild.js";

// Assertions for guild mediators
export const assertGuildMediator: (
	value: unknown,
	route?: string,
) => asserts value is z.infer<typeof GuildMediatorSchema> = createAssertion(
	GuildMediatorSchema,
	"GUILD_MEDIATOR",
	"/guilds/mediators/?",
);

export const assertGuildMediators: (
	value: unknown,
	route?: string,
) => asserts value is z.infer<typeof GuildMediatorSchema>[] = createAssertion(
	GuildMediatorSchema.array(),
	"GUILD_MEDIATORS",
	"/guilds/mediators/?",
);

export const assertPartialGuildMediator: (
	value: unknown,
	route?: string,
) => asserts value is z.infer<typeof PartialGuildMediatorSchema> =
	createAssertion(
		PartialGuildMediatorSchema,
		"GUILD_MEDIATOR",
		"/guilds/mediators/?",
	);

// Assertions for global mediators
export const assertGlobalMediator: (
	value: unknown,
	route?: string,
) => asserts value is z.infer<typeof GlobalMediatorSchema> = createAssertion(
	GlobalMediatorSchema,
	"GLOBAL_MEDIATOR",
	"/mediators/?",
);

export const assertGlobalMediators: (
	value: unknown,
	route?: string,
) => asserts value is z.infer<typeof GlobalMediatorSchema>[] = createAssertion(
	GlobalMediatorSchema.array(),
	"GLOBAL_MEDIATORS",
	"/mediators/?",
);

export const assertPartialGlobalMediator: (
	value: unknown,
	route?: string,
) => asserts value is z.infer<typeof PartialGlobalMediatorSchema> =
	createAssertion(
		PartialGlobalMediatorSchema,
		"GLOBAL_MEDIATOR",
		"/mediators/?",
	);
