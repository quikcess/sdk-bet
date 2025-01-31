import type { APIBlacklistStats } from "@quikcess/bet-api-types/v1";
import { toSnakeCase } from "#quikcess/utils/cases";
import { TopGuildBlacklistStats } from "./topGuild";

/**
 * Represents the blacklist statistics for the entire system.
 */
export class BlacklistStats {
	/** Total number of blacklist reports. */
	public total: number;

	/** Total number of guilds with blacklist reports. */
	public totalGuilds: number;

	/** Statistics of the top guild with the most blacklist reports. */
	public topGuildStats: TopGuildBlacklistStats;

	/** Number of blacklist reports pending review. */
	public pending: number;

	/** Number of blacklist reports currently under investigation. */
	public investigating: number;

	/** Number of validated blacklist reports. */
	public validated: number;

	/** Number of dismissed blacklist reports. */
	public dismissed: number;

	/** Number of blacklist reports involving Discord-related scams. */
	public discord: number;

	/** Number of blacklist reports related to Free Fire scams. */
	public freefire: number;

	/** Number of blacklist reports involving IMEI fraud. */
	public imei: number;

	/** Number of blacklist reports added in the last 24 hours. */
	public recentlyAdded: number;

	/**
	 * Creates a new instance of BlacklistStats.
	 *
	 * @param data - The APIBlacklistStats object used to initialize the statistics.
	 */
	constructor(data: APIBlacklistStats) {
		this.total = data.total;
		this.totalGuilds = data.total_guilds;
		this.topGuildStats = new TopGuildBlacklistStats(data.top_guild_stats);
		this.pending = data.pending;
		this.investigating = data.investigating;
		this.validated = data.validated;
		this.dismissed = data.dismissed;
		this.discord = data.discord;
		this.freefire = data.freefire;
		this.imei = data.imei;
		this.recentlyAdded = data.recently_added;
	}

	/**
	 * Converts the BlacklistStats instance into an APIBlacklistStats object.
	 *
	 * @returns An APIBlacklistStats object representing this instance.
	 */
	public toJSON(): APIBlacklistStats {
		return toSnakeCase<BlacklistStats, APIBlacklistStats>(this);
	}
}
