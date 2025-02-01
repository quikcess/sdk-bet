import type {
	APIGuildUser,
	ISODateString,
	RESTGetAPIGuildUsersPaginationQuery,
} from "@quikcess/bet-api-types/v1";

export type GuildUserUpdateData = Partial<
	Omit<
		GuildUserData,
		"userId" | "stats" | "guildId" | "createdAt" | "updatedAt"
	>
>;

export type GuildUserCreateData = Omit<
	GuildUserData,
	"stats" | "createdAt" | "updatedAt"
>;

export type GuildUserData = Omit<
	APIGuildUser,
	"guild_id" | "user_id" | "created_at" | "updated_at"
> & {
	guildId: string;
	userId: string;
	createdAt: ISODateString;
	updatedAt: ISODateString;
};

export type GuildUsersQuery = Omit<
	RESTGetAPIGuildUsersPaginationQuery,
	"date_start" | "date_end"
> & {
	dateStart?: ISODateString;
	dateEnd?: ISODateString;
};
