import type {
	APITopGuildUserStats,
	APIUserContextStats,
} from "@quikcess/bet-api-types/v1";
import { UserBilled } from "../schemas/billed";
import { UserCommonStatsBase } from "./common";

/**
 * Represents the context stats for the user across multiple guilds.
 */
export class UserContextStats extends UserCommonStatsBase {
	/** The user ID. */
	public user_id: string | null;
	/** The total number of guilds the user is associated with. */
	public total_guilds: number;
	/** The top guild statistics for the user. */
	public top_guild_stats: TopGuildUserStats;

	constructor(data: APIUserContextStats) {
		super(data);
		this.user_id = data.user_id;
		this.total_guilds = data.total_guilds;
		this.top_guild_stats = new TopGuildUserStats(data.top_guild_stats);
	}

	/**
	 * Converts the APIUserContextStats instance to a plain JSON object.
	 */
	public toJSON() {
		return {
			...super.toJSON(),
			user_id: this.user_id,
			total_guilds: this.total_guilds,
			top_guild_stats: this.top_guild_stats.toJSON(),
		};
	}
}

/**
 * Represents the statistics for a top guild user.
 */
export class TopGuildUserStats extends UserBilled {
	/** Guild ID of the top guild user. */
	public guild_id: string | null;

	constructor(data: APITopGuildUserStats) {
		super(data);
		this.guild_id = data.guild_id;
	}

	/**
	 * Converts the APITopGuildUserStats instance to a plain JSON object.
	 */
	public toJSON() {
		return {
			...super.toJSON(),
			guild_id: this.guild_id,
		};
	}
}
