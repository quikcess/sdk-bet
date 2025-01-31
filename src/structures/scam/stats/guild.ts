import type { APIGuildScamStats } from "@quikcess/bet-api-types/v1";
import { toSnakeCase } from "#quikcess/utils/cases";

/**
 * Represents the scam statistics for the entire system.
 */
export class GuildScamStats {
	/** The guild id of scam. */
	public guildId: string;

	/** Total number of reported scams. */
	public total: number;

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

	constructor(data: APIGuildScamStats) {
		this.guildId = data.guild_id;
		this.total = data.total;
		this.pending = data.pending;
		this.investigating = data.investigating;
		this.validated = data.validated;
		this.dismissed = data.dismissed;
		this.refund = data.refund;
		this.stealing = data.stealing;
		this.cheating = data.cheating;
		this.recentlyAdded = data.recently_added;
	}

	public toJSON(): APIGuildScamStats {
		const data: APIGuildScamStats = toSnakeCase<
			GuildScamStats,
			APIGuildScamStats
		>(this);
		return data;
	}
}
