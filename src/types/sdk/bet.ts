import type {
	APIBetFormat,
	APIBetGelType,
	APIBetLog,
	APIBetMode,
	APIBetPlatform,
	APIBetPlayer,
	APIBetPlayerBase,
	APIBetPlayerDetails,
	APIBetStatus,
	APIBetType,
	ISODateString,
} from "@quikcess/bet-api-types/v1";

export interface BetPlayerDetails extends Omit<APIBetPlayerDetails, 'gel_type'> {
  gelType: APIBetGelType;
}

export interface BetPlayerBase extends Omit<APIBetPlayerBase, 'user_id'> {
  userId: string;
}

export interface BetRegenerativePlayer extends BetPlayerBase {
	details: BetPlayerDetails;
}

export interface BetCustomizedPlayer extends BetPlayerBase {
	details: BetPlayerDetails & { platform: APIBetPlatform };
}

export interface BetSpecializedPlayer extends BetPlayerBase {
	details: BetPlayerDetails & { value: number | string };
}

export type BetPlayer =
	| BetRegenerativePlayer
	| BetCustomizedPlayer
	| BetSpecializedPlayer;

export interface BetData {
	guildId: string;
	betId: string;
	platform: APIBetPlatform;
	format: APIBetFormat;
	mode: APIBetMode;
	players: BetPlayer[];
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
