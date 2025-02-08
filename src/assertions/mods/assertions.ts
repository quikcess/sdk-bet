import type { z } from "zod";
import { createAssertion } from "../common";
import { ModSchema, PartialModSchema } from "./mod";

// Assertions for guild mods
export const assertGuildMod: (
	value: unknown,
	route?: string,
) => asserts value is z.infer<typeof ModSchema> = createAssertion(
	ModSchema,
	"MOD",
	"/guilds/mods/?",
);

export const assertGuildMods: (
	value: unknown,
	route?: string,
) => asserts value is z.infer<typeof ModSchema>[] = createAssertion(
	ModSchema.array(),
	"MODS",
	"/guilds/mods/?",
);

export const assertPartialGuildMod: (
	value: unknown,
	route?: string,
) => asserts value is z.infer<typeof PartialModSchema> = createAssertion(
	PartialModSchema,
	"MOD",
	"/guilds/mods/?",
);
