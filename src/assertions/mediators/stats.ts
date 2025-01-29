import { z } from "zod";

export const MediatorBilledRoomsSchema = z.object({
	sold: z.number(),
	revenue: z.number(),
	expenses: z.number(),
	profit: z.number(),
});

export const MediatorBilledSchema = z.object({
	profit: z.number(),
	fee_only: z.number(),
	revenue: z.number(),
	rooms: MediatorBilledRoomsSchema,
});

export const MediatorStatsSchema = z.object({
	total: z.number(),
	started: z.number(),
	closed: z.number(),
	pending: z.number(),
	in_progress: z.number(),
	cancelled: z.number(),
	abandoned: z.number(),
	played: z.number(),
	walkover: z.number(),
	revenged: z.number(),
	billed: MediatorBilledSchema,
});
