import { z } from "zod";

export const APIGuildPermission = z.array(
	z.object({
		id: z.string(),
		role_ids: z.array(z.string()),
	}),
);

export const APIGuildQueueRules = z.array(
	z.object({
		queue_name: z.string(),
		channel_ids: z.array(z.string()),
	}),
);

export const APIGuildChannels = z.object({
	parent_thread_ids: z.array(z.string()),
	blacklist_id: z.string().or(z.null()),
	command_ids: z.array(z.string()),
	queue_rules: APIGuildQueueRules,
});

export const APIGuildLogsSystems = z.object({
	alerts: z.string().or(z.null()),
	reports: z.string().or(z.null()),
	resets: z.string().or(z.null()),
});

export const APIGuildLogsManagements = z.object({
	wins: z.string().or(z.null()),
	loses: z.string().or(z.null()),
	credits: z.string().or(z.null()),
});

export const APIGuildLogsBets = z.object({
	created: z.string().or(z.null()),
	cancelled: z.string().or(z.null()),
	started: z.string().or(z.null()),
	closed: z.string().or(z.null()),
	victory_defined: z.string().or(z.null()),
	updated: z.string().or(z.null()),
});

export const APIGuildLogs = z.object({
	bets: APIGuildLogsBets,
	managements: APIGuildLogsManagements,
	systems: APIGuildLogsSystems,
});
