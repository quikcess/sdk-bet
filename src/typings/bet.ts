import type { APIBetFormat, APIBetGelType, APIBetLog, APIBetMode, APIBetPlatform, APIBetPlayer, APIBetStatus, APIBetType, ISODateString } from "@quikcess/bet-api-types/v1";

export interface Bet {
	guildId: string;
	betId: string;
	platform: APIBetPlatform;
	format: APIBetFormat;
	mode: APIBetMode;
	players: APIBetPlayer[];
	status: APIBetStatus;
	type: APIBetType;
	roomId: number;
	value: number | string;
	queueChannelId: string;
	channelId: string;
	mediatorId: string;
	wo: boolean;
	revenge: boolean;
	emulators: number;
	gelType: APIBetGelType;
	createdAt: ISODateString;
	updatedAt: ISODateString;
	startedAt: ISODateString;
	closedAt: ISODateString | null;
	logs: APIBetLog;
}
