import { z } from "zod";
import { ISODateStringSchema } from "#quikcess/utils/date";
import { MediatorStatsSchema } from "./stats";

export const GlobalMediatorSchema = z.object({
	user_id: z.string().regex(/^\d+$/, "USER_ID_MUST_BE_NUMERICAL_STRING"),
	uptime: z.number(),
	last_entry: z.number().nullable(),
	stats: MediatorStatsSchema,
	created_at: ISODateStringSchema,
	updated_at: ISODateStringSchema,
});

export const PartialGlobalMediatorSchema = GlobalMediatorSchema.partial();
