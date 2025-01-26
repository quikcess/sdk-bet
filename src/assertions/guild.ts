import { ISODateStringSchema } from "@/utils/date/index.js";
import { z } from "zod";
import { assertAPIObject } from "./common.js";

const APIGuildPermission = z.array(
	z.object({
		id: z.string(),
		role_ids: z.array(z.string()),
	}),
);

const APIGuildQueueRules = z.array(
	z.object({
		queue_name: z.string(),
		channel_ids: z.array(z.string()),
	}),
);

const APIGuildChannels = z.object({
	parent_thread_ids: z.array(z.string()),
	blacklist_id: z.string().or(z.null()),
	command_ids: z.array(z.string()),
	queue_rules: APIGuildQueueRules,
});

const APIGuildLogsSystems = z.object({
	alerts: z.string().or(z.null()),
	reports: z.string().or(z.null()),
});

const APIGuildLogsManagements = z.object({
	wins: z.string().or(z.null()),
	loses: z.string().or(z.null()),
	credits: z.string().or(z.null()),
});

const APIGuildLogsBets = z.object({
	created: z.string().or(z.null()),
	cancelled: z.string().or(z.null()),
	started: z.string().or(z.null()),
	closed: z.string().or(z.null()),
	victory_defined: z.string().or(z.null()),
	updated: z.string().or(z.null()),
});

const APIGuildLogs = z.object({
	bets: APIGuildLogsBets,
	managements: APIGuildLogsManagements,
	systems: APIGuildLogsSystems,
});

const GuildSchema = z.object({
	guild_id: z.string().regex(/^\d+$/, "GUILD_ID_MUST_BE_NUMERIC_STRING"),
	permissions: APIGuildPermission,
	systems: z.array(z.number()),
	channels: APIGuildChannels,
	logs: APIGuildLogs,
	created_at: ISODateStringSchema.default(() => new Date().toISOString()),
	updated_at: ISODateStringSchema.default(() => new Date().toISOString()),
});

export function assertGuild(
	value: unknown,
	route?: string,
): asserts value is z.infer<typeof GuildSchema> {
	assertAPIObject({
		schema: GuildSchema,
		value,
		code: "GUILD",
		route: route ?? "/guilds/?",
	});
}

export function assertGuilds(
	value: unknown,
	route?: string,
): asserts value is z.infer<typeof GuildSchema>[] {
	assertAPIObject({
		schema: GuildSchema.array(),
		value,
		code: "GUILD",
		route: route ?? "/guilds/?",
	});
}

export const GuildSchemaPartial = GuildSchema.partial();

export function assertPartialGuild(
	value: unknown,
	route?: string,
): asserts value is z.infer<typeof GuildSchemaPartial> {
	assertAPIObject({
		schema: GuildSchemaPartial,
		value,
		code: "GUILD",
		route: route ?? "/guilds/?",
	});
}
