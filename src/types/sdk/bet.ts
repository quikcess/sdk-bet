import type {
  APIBetFormat,
  APIBetGelType,
  APIBetLog,
  APIBetMode,
  APIBetPlatform,
  APIBetPlayer,
  APIBetStatus,
  APIBetType,
  ISODateString
} from "@quikcess/bet-api-types/v1";

export interface BetPlayerPayload extends Omit<APIBetPlayer, 'user_id'> {
  userId: string;
}

export interface BetLogPayload extends Omit<APIBetLog, 'closed_url' | 'victory_url' | 'started_url' | 'created_url'> {
  closedUrl: string;
  victoryUrl: string;
  startedUrl: string;
  createdUrl: string;
}

export interface BetData {
  guildId: string;
  betId: string;
  platform: APIBetPlatform;
  format: APIBetFormat;
  mode: APIBetMode;
  players: BetPlayerPayload[]; 
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
  logs: BetLogPayload;
}
