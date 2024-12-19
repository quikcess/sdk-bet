import type {
  APIBet,
  APIBetLog,
  APIBetPlayer,
  BetGelType,
  ISODateString
} from "@quikcess/bet-api-types/v1";

export interface BetPlayerPayload extends Omit<APIBetPlayer, "user_id"> {
	userId: string;
}

export interface BetLogPayload
	extends Omit<
		APIBetLog,
		"closed_url" | "victory_url" | "started_url" | "created_url"
	> {
	closedUrl: string;
	victoryUrl: string;
	startedUrl: string;
	createdUrl: string;
}

export type BetData = Omit<
	APIBet,
	| "guild_id"
	| "bet_id"
	| "players"
	| "room_id"
	| "queue_channel_id"
	| "channel_id"
	| "mediator_id"
	| "gel_type"
	| "gel_count"
	| "created_at"
	| "updated_at"
	| "started_at"
	| "closed_at"
	| "logs"
> & {
	guildId: string;
	betId: string;
	players: BetPlayerPayload[];
	roomId: number;
	queueChannelId: string;
	channelId: string;
	mediatorId: string;
	gelType: BetGelType;
	gelCount: number;
	createdAt: ISODateString;
	updatedAt: ISODateString;
	startedAt: ISODateString;
	closedAt: ISODateString | null;
	logs: BetLogPayload;
};
