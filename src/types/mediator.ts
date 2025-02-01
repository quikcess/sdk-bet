import type {
	APIGuildMediator,
	ISODateString,
	RESTGetAPIGuildMediatorsPaginationQuery,
} from "@quikcess/bet-api-types/v1";

export type GuildMediatorUpdateData = Partial<
	Omit<GuildMediatorData, "userId" | "guildId" | "createdAt" | "updatedAt">
>;
export type GuildMediatorCreateData = Omit<
	GuildMediatorData,
	"createdAt" | "updatedAt"
>;

export type GuildMediatorData = Omit<
	APIGuildMediator,
	| "guild_id"
	| "user_id"
	| "category_id"
	| "virtual_accounts"
	| "last_entry"
	| "created_at"
	| "updated_at"
> & {
	guildId: string;
	userId: string;
	categoryId: string;
	virtualAccounts: number;
	lastEntry: number | null;
	createdAt: ISODateString;
	updatedAt: ISODateString;
};

export type GuildMediatorsQuery = Omit<
	RESTGetAPIGuildMediatorsPaginationQuery,
	"date_start" | "date_end"
> & {
	dateStart?: ISODateString;
	dateEnd?: ISODateString;
};
