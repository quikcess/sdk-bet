import { z } from "zod";

export const APIGuildPermission = z.array(
	z.object({
		id: z.number(),
		role_ids: z.array(z.string()),
	}),
);

export const APIGuildChannels = z.object({
	blacklist_id: z.string().nullable(),
	scam_id: z.string().nullable(),
	command_ids: z.array(z.string()),
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

export const APIGuildQueueRules = z.array(
	z.object({
		format: z.string(),
		channel_id: z.string().nullable(),
	}),
);

export const APIGuildBetTax = z.array(
	z.object({
		percentage: z.number(),
		min_value: z.number(),
		max_value: z.number(),
	}),
);

export const APIGuildBetSettings = z.object({
	queue_rules: APIGuildQueueRules,
	taxes: APIGuildBetTax,
	parent_channel_id: z.string().nullable(),
	room_price: z.number(),
	threshold: z.number(),
	start_time: z.number(),
});

export const APIGuildSettings = z.object({
	bet: APIGuildBetSettings,
});
