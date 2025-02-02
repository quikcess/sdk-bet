import type {
	APIGuildUser,
	APIGuildUserNotifications,
	APIGuildUserScores,
	APIGuildUserWallet,
	ISODateString,
	RESTGetAPIGuildUsersPaginationQuery,
} from "@quikcess/bet-api-types/v1";
import type { DeepPartial } from "./common";

export type GuildUserWalletRaw = APIGuildUserWallet;

export type GuildUserScoresRaw = APIGuildUserScores;

export type GuildUserNotificationsRaw = APIGuildUserNotifications;

export type GuildUserUpdateData = DeepPartial<
	Omit<
		GuildUserData,
		| "userId"
		| "stats"
		| "guildId"
		| "createdAt"
		| "updatedAt"
		| "wallet"
		| "scores"
		| "notifications"
	>
> & {
	wallet?: DeepPartial<GuildUserWalletRaw>;
	scores?: DeepPartial<GuildUserScoresRaw>;
	notifications?: DeepPartial<GuildUserNotificationsRaw>;
};

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
