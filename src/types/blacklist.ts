import type {
	APIBlacklist,
	BlacklistTargetType,
	ISODateString,
	RESTGetAPIBlacklistsQuery,
} from "@quikcess/bet-api-types/v1";

export type BlacklistUpdateData = Partial<
	Omit<BlacklistData, "guildId" | "createdAt" | "updatedAt">
>;
export type BlacklistAddData = Omit<BlacklistData, "createdAt" | "updatedAt">;

export type BlacklistData = Omit<
	APIBlacklist,
	| "guild_id"
	| "target_id"
	| "target_type"
	| "added_by"
	| "created_at"
	| "updated_at"
> & {
	guildId: string;
	targetId: string;
	targetType: BlacklistTargetType;
	addedBy: string;
	createdAt: ISODateString;
	updatedAt: ISODateString;
};

export type BlacklistsQuery = Omit<
	RESTGetAPIBlacklistsQuery,
	"guild_id" | "date_start" | "date_end"
> & {
	guildId?: string;
	dateStart?: ISODateString;
	dateEnd?: ISODateString;
};
