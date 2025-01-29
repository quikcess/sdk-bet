import { isISODateString } from "@/utils/date/index";
import { z } from "zod";
import {
	EntityContextSchema,
	ISODateStringSchema,
	NumericStringSchema,
	TimestampSchema,
} from "../common";
import {
	APIBetLogSchema,
	GuildBetBasicSchema,
	GuildBetOutcomeSchema,
	GuildBetPlayerSchema,
} from "./schemas";

export const GuildBetSchema = EntityContextSchema.omit({ user_id: true })
	.extend({
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
		queue_channel_id: NumericStringSchema("queue_channel_id"),
		channel_id: NumericStringSchema("channel_id"),
		mediator_id: NumericStringSchema("mediator_id"),
		started_at: ISODateStringSchema.default(() => new Date().toISOString()),
		closed_at: z
			.string()
			.or(z.null())
			.refine((value) => value === null || isISODateString(value), {
				message: "INVALID_ISO_DATE_STRING",
			}),
		logs: APIBetLogSchema,
	})
	.merge(GuildBetBasicSchema)
	.merge(GuildBetOutcomeSchema)
	.merge(GuildBetPlayerSchema)
	.merge(TimestampSchema);

export const PartialGuildBetSchema = GuildBetSchema.partial();
