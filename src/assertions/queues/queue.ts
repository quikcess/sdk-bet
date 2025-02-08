import { BetType } from "@quikcess/bet-api-types/v1";
import { z } from "zod";
import { ISODateStringSchema } from "#quikcess/utils/date";

export const QueueSchema = z.object({
	guild_id: z.string().regex(/^\d+$/, "GUILD_ID_MUST_BE_NUMERICAL_STRING"),
	queue_id: z.string().regex(/^\d+$/, "QUEUE_ID_MUST_BE_NUMERICAL_STRING"),
	channel_id: z.string().regex(/^\d+$/, "CHANNEL_ID_MUST_BE_NUMERICAL_STRING"),
	type: z.nativeEnum(BetType),
	created_at: ISODateStringSchema,
	updated_at: ISODateStringSchema,
});

export const PartialQueueSchema = QueueSchema.partial();
