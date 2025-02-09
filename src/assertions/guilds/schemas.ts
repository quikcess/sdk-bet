import { z } from "zod";

export const APIGuildPermission = z.array(
	z.object({
		id: z.number(),
		role_ids: z.array(z.string()),
	}),
);

export const APIGuildQueueRules = z.array(
	z.object({
		queue_name: z.string(),
		channel_id: z.string().nullable(),
	}),
);

export const APIGuildChannels = z.object({
	parent_thread_ids: z.array(z.string()),
	blacklist_id: z.string().nullable(),
	scam_id: z.string().nullable(),
	command_ids: z.array(z.string()),
	queue_rules: APIGuildQueueRules,
});

export const APIGuildLogsSystems = z.object({
	alerts: z.string().nullable(),
	reports: z.string().nullable(),
	resets: z.string().nullable(),
});

export const APIGuildLogsManagements = z.object({
	wins: z.string().nullable(),
	loses: z.string().nullable(),
	credits: z.string().nullable(),
});

export const APIGuildLogsBets = z.object({
	created: z.string().nullable(),
	cancelled: z.string().nullable(),
	started: z.string().nullable(),
	closed: z.string().nullable(),
	victory_defined: z.string().nullable(),
	updated: z.string().nullable(),
});

export const APIGuildLogs = z.object({
	bets: APIGuildLogsBets,
	managements: APIGuildLogsManagements,
	systems: APIGuildLogsSystems,
});
