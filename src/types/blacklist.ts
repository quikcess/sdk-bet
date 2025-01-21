import type {
	APIBlacklist,
	BlacklistTargetType,
	ISODateString,
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
