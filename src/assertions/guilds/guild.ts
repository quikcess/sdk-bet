import { z } from "zod";
import { ISODateStringSchema } from "#quikcess/utils/date";
import { APIGuildChannels, APIGuildLogs, APIGuildPermission } from "./schemas";

export const GuildSchema = z.object({
	guild_id: z.string().regex(/^\d+$/, "GUILD_ID_MUST_BE_NUMERICAL_STRING"),
	permissions: APIGuildPermission,
	systems: z.array(z.number()),
	channels: APIGuildChannels,
	logs: APIGuildLogs,
	created_at: ISODateStringSchema,
	updated_at: ISODateStringSchema,
});

export const PartialGuildSchema = GuildSchema.partial();
