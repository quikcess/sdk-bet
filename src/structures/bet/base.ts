import type {
	APIBetFormat,
	APIBetGelType,
	APIBetLog,
	APIBetMode,
	APIBetPlatform,
	APIBetPlayer,
	APIBet,
	APIBetStatus,
	APIBetType,
} from "@quikcess/bet-api-types/v1";

/**
 * Represents a detailed betting entity with utility methods and access to API-related data.
 */
export class BetEntity {
	/** The ID of the guild where the bet was created. */
	public readonly guildId: string;

	/** Unique identifier for the bet. */
	public readonly betId: string;

	/** Platform on which the bet was placed. */
	public readonly platform: APIBetPlatform;

	/** Format of the bet (e.g., single, team). */
	public readonly format: APIBetFormat;

	/** Mode of the bet (e.g., ranked, casual). */
	public readonly mode: APIBetMode;

	/** List of players involved in the bet. */
	public readonly players: APIBetPlayer[];

	/** Current status of the bet. */
	public status: APIBetStatus;

	/** Type of the bet (e.g., normal, custom). */
	public readonly type: APIBetType;

	/** Identifier for the room associated with the bet. */
	public readonly roomId: number;

	/** The value of the bet, which could be numeric or string-based. */
	public readonly value: number | string;

	/** Identifier for the queue channel associated with the bet. */
	public readonly queueChannelId: string;

	/** Identifier for the channel where the bet took place. */
	public readonly channelId: string;

	/** Identifier for the mediator managing the bet. */
	public readonly mediatorId: string;

	/** Flag indicating whether the bet was won by walkover. */
	public readonly wo: boolean;

	/** Flag indicating whether the bet allows revenge matches. */
	public readonly revenge: boolean;

	/** Number of emulators used in the bet. */
	public readonly emulators: number;

	/** The type of gel associated with the bet. */
	public readonly gelType: APIBetGelType;

	/** Timestamp of when the bet was created. */
	public readonly createdAt: Date;

	/** Timestamp of when the bet was last updated. */
	public readonly updatedAt: Date;

	/** Timestamp of when the bet started. */
	public readonly startedAt: Date;

	/** Timestamp of when the bet was closed, or null if not closed. */
	public readonly closedAt: Date | null;

	/** Logs associated with the bet. */
	public readonly logs: APIBetLog;

	/**
	 * Initializes the bet entity using API data.
	 *
	 * @param data - Raw API data representing the bet.
	 */
	constructor(data: APIBet) {
		this.guildId = data.guild_id;
		this.betId = data.bet_id;
		this.platform = data.platform;
		this.format = data.format;
		this.mode = data.mode;
		this.players = data.players;
		this.status = data.status;
		this.type = data.type;
		this.roomId = data.room_id;
		this.value = data.value;
		this.queueChannelId = data.queue_channel_id;
		this.channelId = data.channel_id;
		this.mediatorId = data.mediator_id;
		this.wo = data.wo;
		this.revenge = data.revenge;
		this.emulators = data.emulators;
		this.gelType = data.gel_type;
		this.createdAt = new Date(data.created_at);
		this.updatedAt = new Date(data.updated_at);
		this.startedAt = new Date(data.started_at);
		this.closedAt = data.closed_at ? new Date(data.closed_at) : null;
		this.logs = data.logs;
	}

	/**
	 * Retrieves the logs associated with this bet.
	 *
	 * @async
	 * @returns A promise that resolves to the logs as a string.
	 */
	async getLogs(): Promise<string> {
		return JSON.stringify(this.logs);
	}
}
