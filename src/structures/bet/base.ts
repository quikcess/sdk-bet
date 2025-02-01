import type {
	APIGuildBet,
	BetGelType,
	BetMode,
	BetPlatform,
	BetStatus,
	BetType,
} from "@quikcess/bet-api-types/v1";
import { assertGuildBet } from "#quikcess/assertions/bets/assertions";
import { toSnakeCase } from "#quikcess/utils/cases/index";
import { BetLog } from "./log";
import { BetPlayer } from "./player";

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
	public readonly playersWhoConfirmed: string[];

	/** Current status of the bet. */
	public status: BetStatus;

	/** Type of the bet (e.g., regenerative, customized). */
	public readonly type: BetType;

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
	public readonly closedAt: Date | null;

	public readonly abandonedBy: string | null;

	public readonly cancelledBy: string | null;

	public readonly givenUpBy: string | null;

	/** Logs associated with the bet. */
	public readonly logs: BetLog;

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
		const data: APIGuildBet = toSnakeCase<GuildBet, APIGuildBet>(this);
		return data;
	}
}
