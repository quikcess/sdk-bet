import type {
	APIMediatorContextStats,
	APITopGuildMediatorStats,
} from "@quikcess/bet-api-types/v1";
import { MediatorBilled } from "../schemas/billed";
import { MediatorCommonStatsBase } from "./common";

/**
 * Class representing the context statistics for a mediator, extending the basic statistics with specific context data.
 */
export class MediatorContextStats extends MediatorCommonStatsBase {
	/** The unique identifier of the mediator. */
	public mediatorId: string | null;

	/** The total number of guilds associated with the mediator. */
	public totalGuilds: number;

	/** The top guild statistics associated with the mediator. */
	public topGuildStats: TopGuildMediatorStats;

	/** Constructor that initializes the MediatorContextStats instance with the provided data. */
	constructor(data: APIMediatorContextStats) {
		super(data);
		this.mediatorId = data.mediator_id;
		this.totalGuilds = data.total_guilds;
		this.topGuildStats = new TopGuildMediatorStats(data.top_guild_stats);
	}

	/** Converts the MediatorContextStats instance to a plain JSON object. */
	public toJSON() {
		return {
			...super.toJSON(),
			mediator_id: this.mediatorId,
			total_guilds: this.totalGuilds,
			top_guild_stats: this.topGuildStats,
		};
	}
}

/**
 * Class representing the statistics for the top guild associated with a mediator, including the guild ID and billing information.
 */
export class TopGuildMediatorStats extends MediatorBilled {
	/** The unique identifier of the guild. */
	public guildId: string | null;

	/** Constructor that initializes the TopGuildMediatorStats instance with the provided data. */
	constructor(data: APITopGuildMediatorStats) {
		super(data);
		this.guildId = data.guild_id;
	}

	/** Converts the TopGuildMediatorStats instance to a plain JSON object. */
	public toJSON() {
		return {
			...super.toJSON(),
			guild_id: this.guildId,
		};
	}
}
