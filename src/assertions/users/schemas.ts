import { z } from "zod";

export const UserScoresSchema = z.object({
	wins: z.number(),
	loses: z.number(),
	consecutives: z.number(),
});

export const UserWalletSchema = z.object({
	credits: z.number(),
});

export const UserNotificationsSchema = z.object({
	events: z.boolean(),
	waiting_bets: z.boolean(),
});
