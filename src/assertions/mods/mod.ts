import { GuildModType } from "@quikcess/bet-api-types/v1";
import { z } from "zod";
import { ISODateStringSchema } from "#quikcess/utils/date";
import { deepPartialify } from "../deep";
import { ModDataSchema } from "./schemas";

export const ModSchema = z.object({
	guild_id: z.string().regex(/^\d+$/, "GUILD_ID_MUST_BE_NUMERICAL_STRING"),
	type: z.nativeEnum(GuildModType),
	tag: z.string(),
	data: ModDataSchema,
	created_at: ISODateStringSchema,
	updated_at: ISODateStringSchema,
});

export const PartialModSchema = deepPartialify(ModSchema);
