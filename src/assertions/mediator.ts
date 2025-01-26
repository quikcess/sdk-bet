import { ISODateStringSchema } from "@/utils/date/index.js";
import { z } from "zod";
import { assertAPIObject } from "./common.js";

const APIMediatorLimiter = z.object({
	simultaneous: z.number(),
	daily: z.number(),
});

const APIMediatorSignature = z.object({
	role_id: z.string().or(z.null()),
	expiration_time: z.number().or(z.null()),
	autorole: z.boolean().default(false),
});

const APIMediatorPix = z.object({
	key: z.string().or(z.null()),
	name: z.string().or(z.null()),
	message: z.string().or(z.null()),
});

const APIMediatorBilledRooms = z.object({
	sold: z.number(),
	invoicing: z.number(),
	investment: z.number(),
	profit: z.number(),
});

const APIMediatorBilled = z.object({
	profit: z.number(),
	fee_only: z.number(),
	rooms: APIMediatorBilledRooms,
});

const APIMediatorStats = z.object({
	total: z.number(),
	started_bets: z.number(),
	closed_bets: z.number(),
	pending_bets: z.number(),
	in_progress_bets: z.number(),
	cancelled_bets: z.number(),
	abandoned_bets: z.number(),
	played_bets: z.number(),
	walkover_bets: z.number(),
	revenged_bets: z.number(),
	billed: APIMediatorBilled,
});

const MediatorSchema = z.object({
	user_id: z.string().regex(/^\d+$/, "USER_ID_MUST_BE_NUMERIC_STRING"),
	guild_id: z.string().regex(/^\d+$/, "GUILD_ID_MUST_BE_NUMERIC_STRING"),
	category_id: z.string().or(z.null()),
	pix: APIMediatorPix,
	virtual_accounts: z.number(),
	uptime: z.number(),
	last_entry: z.number().or(z.null()),
	signature: APIMediatorSignature,
	limiter: APIMediatorLimiter,
	stats: APIMediatorStats,
	created_at: ISODateStringSchema.default(() => new Date().toISOString()),
	updated_at: ISODateStringSchema.default(() => new Date().toISOString()),
});

export function assertMediator(
	value: unknown,
	route?: string,
): asserts value is z.infer<typeof MediatorSchema> {
	assertAPIObject({
		schema: MediatorSchema,
		value,
		code: "USER",
		route: route ?? "/mediators/?",
	});
}

export function assertMediators(
	value: unknown,
	route?: string,
): asserts value is z.infer<typeof MediatorSchema>[] {
	assertAPIObject({
		schema: MediatorSchema.array(),
		value,
		code: "MEDIATOR",
		route: route ?? "/mediators/?",
	});
}

export const MediatorSchemaPartial = MediatorSchema.partial();

export function assertPartialMediator(
	value: unknown,
	route?: string,
): asserts value is z.infer<typeof MediatorSchemaPartial> {
	assertAPIObject({
		schema: MediatorSchemaPartial,
		value,
		code: "MEDIATOR",
		route: route ?? "/mediators/?",
	});
}
