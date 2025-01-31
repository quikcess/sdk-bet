import { z } from "zod";

export const UserBilledRoomsSchema = z.object({
	purchased: z.number(),
	expenses: z.number(),
});

export const UserBilledSchema = z.object({
	profit: z.number(),
	fee_only: z.number(),
	rooms: UserBilledRoomsSchema,
});

export const UserStatsSchema = z.object({
	total: z.number(),
	started: z.number(),
	closed: z.number(),
	pending: z.number(),
	in_progress: z.number(),
	confirmed: z.number(),
	cancelled: z.number(),
	abandoned: z.number(),
	played: z.number(),
	walkover: z.number(),
	revenged: z.number(),
	punishments: z.number(),
	won: z.number(),
	lost: z.number(),
	billed: UserBilledSchema,
});
