import { z } from "zod";
import { EntityContextSchema, TimestampSchema } from "../common";
import { APIGuildChannels, APIGuildLogs, APIGuildPermission } from "./schemas";

export const GuildSchema = EntityContextSchema.omit({ user_id: true })
	.extend({
		permissions: APIGuildPermission,
		systems: z.array(z.number()),
		channels: APIGuildChannels,
		logs: APIGuildLogs,
	})
	.merge(TimestampSchema);

export const PartialGuildSchema = GuildSchema.partial();
