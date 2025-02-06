import type {
	APIGuildMediator,
	APIGuildMediatorLimiter,
	APIGuildMediatorPix,
	APIGuildMediatorSignature,
	ISODateString,
	RESTGetAPIGuildMediatorsPaginationQuery,
} from "@quikcess/bet-api-types/v1";
import type { DeepPartial } from "./common";

export type GuildMediatorLimiterRaw = APIGuildMediatorLimiter;
export type GuildMediatorPixRaw = APIGuildMediatorPix;
export type GuildMediatorSignatureRaw = APIGuildMediatorSignature;

export type GuildMediatorUpdateData = DeepPartial<
	Omit<
		GuildMediatorData,
		| "userId"
		| "guildId"
		| "createdAt"
		| "updatedAt"
		| "limiter"
		| "pix"
		| "signature"
	>
> & {
	limiter?: DeepPartial<GuildMediatorLimiterRaw>;
	pix?: DeepPartial<GuildMediatorPixRaw>;
	signature?: DeepPartial<GuildMediatorSignatureRaw>;
};

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
	categoryId: string | null;
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
