import type {
	APIButtonComponent,
	APIEmbed,
	APISelectMenuComponent,
} from "discord-api-types/v10";
import { z } from "zod";

export const APIGuildModComponentsSchema = z.object({
	buttons: z.array(z.custom<APIButtonComponent>()),
	select_menus: z.array(z.custom<APISelectMenuComponent>()),
});

export const ModDataSchema = z.object({
	embeds: z.array(z.custom<APIEmbed>()),
	content: z.string(),
	components: APIGuildModComponentsSchema,
});
