import type { APITopGuildBlacklistStats } from "@quikcess/bet-api-types/v1";
import { toSnakeCase } from "#quikcess/utils/cases";

/**
 * Represents the blacklist statistics for the top guild associated with scam reports.
 */
export class TopGuildBlacklistStats {
	/** The unique identifier of the top guild, or `null` if unavailable. */
	public guildId: string | null;

	/** Total number of blacklist reports in this guild. */
	public total: number;

	/** Number of blacklist reports pending review. */
	public pending: number;

	/** Number of blacklist reports currently under investigation. */
	public investigating: number;

	/** Number of validated blacklist reports. */
	public validated: number;

	/** Number of dismissed blacklist reports. */
	public dismissed: number;

	/** Number of blacklist reports related to Discord scams. */
	public discord: number;

	/** Number of blacklist reports related to Free Fire scams. */
	public freefire: number;

	/** Number of blacklist reports involving IMEI fraud. */
	public imei: number;

	/** Number of blacklist reports added in the last 24 hours. */
	public recentlyAdded: number;

	/**
	 * Creates a new instance of TopGuildBlacklistStats.
	 *
	 * @param data - The APITopGuildBlacklistStats object used to initialize the statistics.
	 */
	constructor(data: APITopGuildBlacklistStats) {
		this.guildId = data.guild_id;
		this.total = data.total;
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
	 * Converts the TopGuildBlacklistStats instance into an APITopGuildBlacklistStats object.
	 *
	 * @returns An APITopGuildBlacklistStats object representing this instance.
	 */
	public toJSON(): APITopGuildBlacklistStats {
		return toSnakeCase<TopGuildBlacklistStats, APITopGuildBlacklistStats>(this);
	}
}
