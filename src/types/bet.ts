import type {
	APIBetLog,
	APIBetPlayer,
	APIGuildBet,
	BetGelType,
	ISODateString,
} from "@quikcess/bet-api-types/v1";

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
