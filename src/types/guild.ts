import type {
	APIGuild,
	APIGuildChannels,
	APIGuildLogs,
	APIGuildPermission,
	ISODateString,
	RESTGetAPIGuildsPaginationQuery,
} from "@quikcess/bet-api-types/v1";
import type { DeepPartial } from "./common";

export type GuildPermissionRaw = APIGuildPermission;

export type GuildChannelsRaw = APIGuildChannels;

export type GuildLogsRaw = APIGuildLogs;

export type GuildUpdateData = DeepPartial<
	Omit<GuildData, "guildId" | "createdAt" | "updatedAt" | "logs">
> & {
	permissions?: DeepPartial<GuildPermissionRaw>;
	channels?: DeepPartial<GuildChannelsRaw>;
	logs?: DeepPartial<GuildLogsRaw>;
};
export type GuildCreateData = Omit<GuildData, "createdAt" | "updatedAt">;

export type GuildData = Omit<
	APIGuild,
	"guild_id" | "created_at" | "updated_at"
> & {
	guildId: string;
	createdAt: ISODateString;
	updatedAt: ISODateString;
};

export type GuildsQuery = Omit<
	RESTGetAPIGuildsPaginationQuery,
	"date_start" | "date_end"
> & {
	dateStart?: ISODateString;
	dateEnd?: ISODateString;
};
