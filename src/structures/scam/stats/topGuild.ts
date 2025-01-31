import type { APITopGuildScamsStats } from "@quikcess/bet-api-types/v1";
import { toSnakeCase } from "#quikcess/utils/cases";

/**
 * Class representing the statistics for the top guild associated with a scam, including the guild ID and billing information.
 */
export class TopGuildScamsStats {
	/** The unique identifier of the guild. */
	public guildId: string | null;

	/** Total number of reported scams. */
	public total: number;

	/** Total number of guilds scams. */
	public totalGuilds: number;

	/** Total number of guilds scams. */
	public topGuildStats: TopGuildScamsStats;

	/** Number of scams pending review. */
	public pending: number;

	/** Number of scams currently under investigation. */
	public investigating: number;

	/** Number of validated scams. */
	public validated: number;

	/** Number of dismissed scam reports. */
	public dismissed: number;

	/** Number of scams that resulted in refunds. */
	public refund: number;

	/** Number of scams involving stealing. */
	public stealing: number;

	/** Number of scams involving cheating. */
	public cheating: number;

	/** Number of scams added in the last 24 hours. */
	public recentlyAdded: number;

	/** Constructor that initializes the TopGuildScamsStats instance with the provided data. */
	constructor(data: APITopGuildScamsStats) {
		this.guildId = data.guild_id;
		this.pending = data.pending;
		this.investigating = data.investigating;
		this.validated = data.validated;
		this.dismissed = data.dismissed;
		this.refund = data.refund;
		this.stealing = data.stealing;
		this.cheating = data.cheating;
		this.recentlyAdded = data.recently_added;
	}

	/** Converts the TopGuildScamsStats instance to a plain JSON object. */
	public toJSON(): APITopGuildScamsStats {
		const data: APITopGuildScamsStats = toSnakeCase<
			TopGuildScamsStats,
			APITopGuildScamsStats
		>(this);
		return data;
	}
}
