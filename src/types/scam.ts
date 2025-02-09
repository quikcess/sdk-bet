import type {
	APIScam,
	ISODateString,
	RESTGetAPIScamsQuery,
} from "@quikcess/bet-api-types/v1";

export type ScamUpdateData = Partial<
	Omit<ScamData, "guildId" | "createdAt" | "updatedAt">
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

export type ScamsQuery = Omit<
	RESTGetAPIScamsQuery,
	"guild_id" | "date_start" | "date_end"
> & {
	guildId?: string;
	dateStart?: ISODateString;
	dateEnd?: ISODateString;
};
