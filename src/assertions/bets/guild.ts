import { z } from "zod";
import {
	ISODateStringSchema,
	isISODateString,
} from "#quikcess/utils/date/index";
import {
	APIBetLogSchema,
	GuildBetBasicSchema,
	GuildBetOutcomeSchema,
	GuildBetPlayerSchema,
} from "./schemas";

export const GuildBetSchema = z
	.object({
		guild_id: z.string().regex(/^\d+$/, "GUILD_ID_MUST_BE_NUMERICAL_STRING"),
		value: z.union([
			z.number(),
			z
				.string()
				.regex(/^(\d+)(\/\d+){0,2}$/, "INVALID_VALUE_FORMAT")
				.refine(
					(str) => str.split("/").every((num) => !Number.isNaN(Number(num))),
					{ message: "INVALID_NUMBER_IN_STRING" },
				),
		]),
		queue_channel_id: z
			.string()
			.regex(/^\d+$/, "QUEUE_CHANNEL_ID_MUST_BE_NUMERICAL_STRING"),
		channel_id: z
			.string()
			.regex(/^\d+$/, "CHANNEL_ID_MUST_BE_NUMERICAL_STRING"),
		mediator_id: z
			.string()
			.regex(/^\d+$/, "MEDIATOR_ID_MUST_BE_NUMERICAL_STRING"),
		started_at: ISODateStringSchema,
		closed_at: z
			.string()
			.or(z.null())
			.refine((value) => value === null || isISODateString(value), {
				message: "INVALID_ISO_DATE_STRING",
			}),
		logs: APIBetLogSchema,
		created_at: ISODateStringSchema,
		updated_at: ISODateStringSchema,
	})
	.merge(GuildBetBasicSchema)
	.merge(GuildBetOutcomeSchema)
	.merge(GuildBetPlayerSchema);

export const PartialGuildBetSchema = GuildBetSchema.partial();
