import { z } from "zod";
import { EntityContextSchema, TimestampSchema } from "../common.js";
import {
	APIGuildChannels,
	APIGuildLogs,
	APIGuildPermission,
} from "./schemas.js";

export const GuildSchema = EntityContextSchema.omit({ user_id: true })
	.extend({
		permissions: APIGuildPermission,
		systems: z.array(z.number()),
		channels: APIGuildChannels,
		logs: APIGuildLogs,
	})
	.merge(TimestampSchema);

export const PartialGuildSchema = GuildSchema.partial();
