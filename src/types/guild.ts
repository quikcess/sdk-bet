import type {
	APIBetLog,
	APIBetPlayer,
	APIGuild,
	APIGuildBet,
	APIGuildChannels,
	APIGuildLogs,
	APIGuildMediator,
	APIGuildMediatorLimiter,
	APIGuildMediatorPix,
	APIGuildMediatorSignature,
	APIGuildMod,
	APIGuildPermission,
	APIGuildQueue,
	APIGuildSettings,
	APIGuildUser,
	APIGuildUserNotifications,
	APIGuildUserScores,
	APIGuildUserWallet,
	BetGelType,
	ISODateString,
	RESTGetAPIGuildBetCountQuery,
	RESTGetAPIGuildBetsQuery,
	RESTGetAPIGuildMediatorsPaginationQuery,
	RESTGetAPIGuildModsPaginationQuery,
	RESTGetAPIGuildQueuesPaginationQuery,
	RESTGetAPIGuildUsersPaginationQuery,
	RESTGetAPIGuildsPaginationQuery,
} from "@quikcess/bet-api-types/v1";
import type {
	APIButtonComponent,
	APISelectMenuComponent,
} from "discord-api-types/v10";
import type { DeepPartial } from "./client";

export type GuildSettingsRaw = APIGuildSettings;

export type GuildPermissionRaw = APIGuildPermission;

export type GuildChannelsRaw = APIGuildChannels;

export type GuildLogsRaw = APIGuildLogs;

export type GuildUpdateData = DeepPartial<
	Omit<GuildData, "guildId" | "createdAt" | "updatedAt" | "logs">
> & {
	settings?: DeepPartial<GuildSettingsRaw>;
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

/** --------------------= USERS =-------------------- */

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

/** --------------------= MEDIATORS =-------------------- */

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

/** --------------------= MODS =-------------------- */

export type GuildModCreateData = Omit<GuildModData, "createdAt" | "updatedAt">;

export type GuildModUpdateData = DeepPartial<
	Omit<GuildModData, "guildId" | "createdAt" | "updatedAt">
>;

export type GuildModComponents = {
	buttons: APIButtonComponent[];
	selectMenus: APISelectMenuComponent[];
};

export type GuildModData = Omit<
	APIGuildMod,
	"guild_id" | "created_at" | "updated_at"
> & {
	guildId: string;
	createdAt: ISODateString;
	updatedAt: ISODateString;
};

export type GuildModsQuery = Omit<
	RESTGetAPIGuildModsPaginationQuery,
	"date_start" | "date_end"
> & {
	dateStart?: ISODateString;
	dateEnd?: ISODateString;
};

/** --------------------= QUEUES =-------------------- */

export type GuildQueueCreateData = Omit<
	GuildQueueData,
	"createdAt" | "updatedAt"
>;

export type GuildQueueUpdateData = Partial<
	Omit<GuildQueueData, "guildId" | "createdAt" | "updatedAt">
>;

export type GuildQueueData = Omit<
	APIGuildQueue,
	"guild_id" | "queue_id" | "channel_id" | "created_at" | "updated_at"
> & {
	guildId: string;
	queueId: string;
	channelId: string;
	createdAt: ISODateString;
	updatedAt: ISODateString;
};

export type GuildQueuesQuery = Omit<
	RESTGetAPIGuildQueuesPaginationQuery,
	"date_start" | "date_end"
> & {
	dateStart?: ISODateString;
	dateEnd?: ISODateString;
};

/** --------------------= BETS =-------------------- */

export type BetUpdateData = Partial<
	Omit<BetData, "betId" | "guildId" | "createdAt" | "updatedAt">
>;
export type BetCreateData = Omit<BetData, "createdAt" | "updatedAt">;

export interface BetPlayerData extends Omit<APIBetPlayer, "user_id"> {
	userId: string;
}

export interface BetLogData
	extends Omit<
		APIBetLog,
		"closed_url" | "victory_url" | "started_url" | "created_url"
	> {
	closedUrl: string | null;
	victoryUrl: string | null;
	startedUrl: string | null;
	createdUrl: string | null;
}

export type BetData = Omit<
	APIGuildBet,
	| "guild_id"
	| "bet_id"
	| "players"
	| "room_id"
	| "room_price"
	| "queue_channel_id"
	| "channel_id"
	| "mediator_id"
	| "gel_type"
	| "gel_count"
	| "created_at"
	| "updated_at"
	| "started_at"
	| "closed_at"
	| "players_who_confirmed"
	| "cancelled_by"
	| "abandoned_by"
	| "given_up_by"
	| "room_price"
	| "logs"
> & {
	guildId: string;
	betId: string;
	players: BetPlayerData[];
	playersWhoConfirmed: string[];
	cancelledBy: string | null;
	abandonedBy: string | null;
	givenUpBy: string | null;
	roomId: number;
	roomPrice: number;
	queueChannelId: string;
	channelId: string;
	mediatorId: string;
	gelType: BetGelType;
	gelCount: number;
	createdAt: ISODateString;
	updatedAt: ISODateString;
	startedAt: ISODateString;
	closedAt: ISODateString | null;
	logs: BetLogData;
};

export interface GuildBetCountQuery
	extends Omit<RESTGetAPIGuildBetCountQuery, "date_start" | "date_end"> {
	mediator_id?: string;
}

export type GuildBetsQuery = Omit<
	RESTGetAPIGuildBetsQuery,
	"date_start" | "date_end" | "player_ids"
> & {
	playerIds?: string[];
	dateStart?: ISODateString;
	dateEnd?: ISODateString;
};
