import type {
	APIGuild,
	ISODateString,
	RESTGetAPIGuildsPaginationQuery,
} from "@quikcess/bet-api-types/v1";

export type GuildUpdateData = Partial<
	Omit<GuildData, "guildId" | "createdAt" | "updatedAt">
>;
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
