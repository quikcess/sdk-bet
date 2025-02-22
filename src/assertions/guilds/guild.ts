import { z } from "zod";
import { ISODateStringSchema } from "#quikcess/utils/date";
import { deepPartialify } from "../deep";
import {
	APIGuildChannels,
	APIGuildLogs,
	APIGuildPermission,
	APIGuildSettings,
} from "./schemas";

export const GuildSchema = z.object({
	guild_id: z.string().regex(/^\d+$/, "GUILD_ID_MUST_BE_NUMERICAL_STRING"),
	prefix: z.string(),
	permissions: APIGuildPermission,
	systems: z.array(z.number()),
	settings: APIGuildSettings,
	channels: APIGuildChannels,
	logs: APIGuildLogs,
	created_at: ISODateStringSchema,
	updated_at: ISODateStringSchema,
});

export const PartialGuildSchema = deepPartialify(GuildSchema);
