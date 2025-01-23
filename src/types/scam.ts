import type { APIScam, ISODateString } from "@quikcess/bet-api-types/v1";

export type ScamUpdateData = Partial<
	Omit<ScamData, "guild_id" | "created_at" | "updated_at">
>;

export type ScamData = Omit<
	APIScam,
	| "guild_id"
	| "target_name"
	| "reported_by"
	| "created_at"
	| "updated_at"
	| "validated_at"
	| "validated_by"
> & {
	guildId: string;
	targetName: string;
	reportedBy: string;
	createdAt: ISODateString;
	updatedAt: ISODateString;
	validatedAt?: ISODateString;
	validatedBy?: string;
};
