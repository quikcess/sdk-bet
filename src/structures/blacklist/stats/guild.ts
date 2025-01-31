import type { APIGuildBlacklistStats } from "@quikcess/bet-api-types/v1";
import { toSnakeCase } from "#quikcess/utils/cases";

/**
 * Represents the blacklist statistics for a specific guild.
 */
export class GuildBlacklistStats {
	/** The guild (server) ID associated with the blacklist statistics. */
	public guildId: string;

	/** Total number of blacklist reports in the guild. */
	public total: number;

	/** Number of blacklist reports pending review. */
	public pending: number;

	/** Number of blacklist reports currently under investigation. */
	public investigating: number;

	/** Number of validated blacklist reports. */
	public validated: number;

	/** Number of dismissed blacklist reports. */
	public dismissed: number;

	/** Number of blacklist reports related to Discord-related scams. */
	public discord: number;

	/** Number of blacklist reports related to Free Fire scams. */
	public freefire: number;

	/** Number of blacklist reports involving IMEI fraud. */
	public imei: number;

	/** Number of blacklist reports added in the last 24 hours. */
	public recentlyAdded: number;

	/**
	 * Creates a new instance of GuildBlacklistStats.
	 *
	 * @param data - The APIGuildBlacklistStats object used to initialize the statistics.
	 */
	constructor(data: APIGuildBlacklistStats) {
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
	 * Converts the GuildBlacklistStats instance into an APIGuildBlacklistStats object.
	 *
	 * @returns An APIGuildBlacklistStats object representing this instance.
	 */
	public toJSON(): APIGuildBlacklistStats {
		return toSnakeCase<GuildBlacklistStats, APIGuildBlacklistStats>(this);
	}
}
