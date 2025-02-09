import type {
	APIGuildQueue,
	ISODateString,
	RESTGetAPIGuildQueuesPaginationQuery,
} from "@quikcess/bet-api-types/v1";

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
