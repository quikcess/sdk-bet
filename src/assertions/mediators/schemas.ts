import { z } from "zod";

export const MediatorSignatureSchema = z.object({
	role_id: z.string().nullable(),
	expiration_time: z.number().nullable(),
	autorole: z.boolean().default(false),
});

export const MediatorPixSchema = z.object({
	key: z.string().nullable(),
	name: z.string().nullable(),
	message: z.string().nullable(),
});

export const MediatorLimiterSchema = z.object({
	simultaneous: z.number(),
	daily: z.number(),
});
