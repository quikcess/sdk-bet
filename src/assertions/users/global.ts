import z from "zod";
import { ISODateStringSchema } from "#quikcess/utils/date";
import { deepPartialify } from "../deep";
import { UserStatsSchema } from "./stats";

export const GlobalUserSchema = z.object({
	user_id: z.string().regex(/^\d+$/, "USER_ID_MUST_BE_NUMERICAL_STRING"),
	stats: UserStatsSchema,
	created_at: ISODateStringSchema,
	updated_at: ISODateStringSchema,
});

export const PartialGlobalUserSchema = deepPartialify(GlobalUserSchema);
