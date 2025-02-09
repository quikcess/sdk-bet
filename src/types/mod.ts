import type {
	APIGuildMod,
	ISODateString,
	RESTGetAPIGuildModsPaginationQuery,
} from "@quikcess/bet-api-types/v1";
import type {
	APIButtonComponent,
	APISelectMenuComponent,
} from "discord-api-types/v10";
import type { DeepPartial } from "./common";

export type GuildModCreateData = Omit<GuildModData, "createdAt" | "updatedAt">;

export type GuildModUpdateData = DeepPartial<
	Omit<GuildModData, "guildId" | "createdAt" | "updatedAt">
>;

export type GuildModComponents = {
	buttons: APIButtonComponent[];
	selectMenus: APISelectMenuComponent[];
};

export type GuildModData = Omit<
	APIGuildMod,
	"guild_id" | "created_at" | "updated_at"
> & {
	guildId: string;
	createdAt: ISODateString;
	updatedAt: ISODateString;
};

export type GuildModsQuery = Omit<
	RESTGetAPIGuildModsPaginationQuery,
	"date_start" | "date_end"
> & {
	dateStart?: ISODateString;
	dateEnd?: ISODateString;
};
