import type {
	APIGuildBet,
	BetGelType,
	BetMode,
	BetPlatform,
	BetStatus,
	BetType,
} from "@quikcess/bet-api-types/v1";
import { assertGuildBet } from "#quikcess/assertions/bets/assertions";
import { BetLog } from "./schemas/log";
import { BetPlayer } from "./schemas/player";

/**
 * Represents a detailed betting entity with utility methods and access to API-related data.
 */
export class GuildBet {
	/** The ID of the guild where the bet was created. */
	public readonly guildId: string;

	/** Unique identifier for the bet. */
	public readonly betId: string;

	/** Platform on which the bet was placed. */
	public readonly platform: BetPlatform;

	/** Format of the bet (e.g., Normal, Tático). */
	public readonly format: string;

	/** Mode of the bet (e.g., 1v1, 2v2). */
	public readonly mode: BetMode;

	/** List of players involved in the bet. */
	public readonly players: BetPlayer[];

	/** List of players involved in the bet. */
	public playersWhoConfirmed: string[];

	/** Current status of the bet. */
	public status: BetStatus;

	/** Type of the bet (e.g., regenerative, customized). */
	public readonly type: BetType;

	/** Identifier for the room associated with the bet. */
	public roomId: number;

	/** Identifier for the room price associated with the bet. */
	public roomPrice: number;

	/** The value of the bet, which could be numeric or string-based. */
	public value: number | string;

	/** Identifier for the queue channel associated with the bet. */
	public readonly queueChannelId: string;

	/** Identifier for the channel where the bet took place. */
	public channelId: string;

	/** Identifier for the mediator managing the bet. */
	public mediatorId: string;

	/** Flag indicating whether the bet was won by walkover. */
	public wo: boolean;

	/** Flag indicating whether the bet allows revenge matches. */
	public revenge: boolean;

	/** Number of emulators used in the bet. */
	public readonly emulators: number;

	/** The type of gel associated with the bet. */
	public readonly gelType: BetGelType;

	/** The count of gel associated with the bet. */
	public readonly gelCount: number;

	/** Timestamp of when the bet was created. */
	public readonly createdAt: Date;

	/** Timestamp of when the bet was last updated. */
	public readonly updatedAt: Date;

	/** Timestamp of when the bet started. */
	public readonly startedAt: Date;

	/** Timestamp of when the bet was closed, or null if not closed. */
	public closedAt: Date | null;

	public abandonedBy: string | null;

	public cancelledBy: string | null;

	public givenUpBy: string | null;

	/** Logs associated with the bet. */
	public logs: BetLog;

	/**
	 * Initializes the bet entity using API data.
	 *
	 * @param data - Raw API data representing the bet.
	 */
	constructor(data: APIGuildBet) {
		assertGuildBet(data, "structures/bet/base");

		this.guildId = data.guild_id;
		this.betId = data.bet_id;
		this.platform = data.platform;
		this.format = data.format;
		this.mode = data.mode;
		this.players = data.players.map((player) => new BetPlayer(player));
		this.playersWhoConfirmed = data.players_who_confirmed;
		this.status = data.status;
		this.type = data.type;
		this.roomId = data.room_id;
		this.roomPrice = data.room_price;
		this.value = data.value;
		this.queueChannelId = data.queue_channel_id;
		this.channelId = data.channel_id;
		this.mediatorId = data.mediator_id;
		this.wo = data.wo;
		this.revenge = data.revenge;
		this.emulators = data.emulators;
		this.gelType = data.gel_type;
		this.gelCount = data.gel_count;
		this.abandonedBy = data.abandoned_by;
		this.cancelledBy = data.cancelled_by;
		this.givenUpBy = data.given_up_by;
		this.createdAt = new Date(data.created_at);
		this.updatedAt = new Date(data.updated_at);
		this.startedAt = new Date(data.started_at);
		this.closedAt = data.closed_at ? new Date(data.closed_at) : null;
		this.logs = new BetLog(data.logs);
	}

	public static from(data: APIGuildBet): GuildBet {
		return new GuildBet(data);
	}

	public toJSON(): APIGuildBet {
		return {
			guild_id: this.guildId,
			bet_id: this.betId,
			platform: this.platform,
			format: this.format,
			mode: this.mode,
			players: this.players.map((player) => player.toJSON()),
			players_who_confirmed: this.playersWhoConfirmed,
			status: this.status,
			type: this.type,
			room_id: this.roomId,
			room_price: this.roomPrice,
			value: this.value,
			queue_channel_id: this.queueChannelId,
			channel_id: this.channelId,
			mediator_id: this.mediatorId,
			wo: this.wo,
			revenge: this.revenge,
			emulators: this.emulators,
			gel_type: this.gelType,
			gel_count: this.gelCount,
			abandoned_by: this.abandonedBy,
			cancelled_by: this.cancelledBy,
			given_up_by: this.givenUpBy,
			created_at: this.createdAt.toISOString(),
			updated_at: this.updatedAt.toISOString(),
			started_at: this.startedAt.toISOString(),
			closed_at: this.closedAt?.toISOString() ?? null,
			logs: this.logs.toJSON(),
		};
	}
}
