import type { APIGuildsStats } from "@quikcess/bet-api-types/v1";
import { BetStats } from "#quikcess/structures/bet/stats/global";
import { BlacklistStats } from "#quikcess/structures/blacklist/stats/global";
import { MediatorContextStats } from "#quikcess/structures/mediator/stats/global";
import { ScamStats } from "#quikcess/structures/scam/stats/global";
import { UserContextStats } from "#quikcess/structures/user/stats/global";
import { toSnakeCase } from "#quikcess/utils/cases";

/**
 * Represents the statistics for a specific guild, including data related to bets, users, mediators, scams, and blacklist.
 */
export class GuildsStats {
	/** Statistics related to bets within the guild. */
	public readonly bets: BetStats;

	/** Statistics related to users within the guild. */
	public readonly users: UserContextStats;

	/** Statistics related to mediators within the guild. */
	public readonly mediators: MediatorContextStats;

	/** Statistics related to scams reported within the guild. */
	public readonly scams: ScamStats;

	/** Statistics related to the blacklist within the guild. */
	public readonly blacklist: BlacklistStats;

	/**
	 * Creates a new instance of the GuildStats class.
	 *
	 * @param bets - Statistics related to bets (default: empty object or default values).
	 * @param users - Statistics related to users (default: empty object or default values).
	 * @param mediators - Statistics related to mediators (default: empty object or default values).
	 * @param scams - Statistics related to scams (default: empty object or default values).
	 * @param blacklist - Statistics related to the blacklist (default: empty object or default values).
	 */
	constructor(data: APIGuildsStats) {
		this.bets = new BetStats(data.bets);
		this.users = new UserContextStats(data.users);
		this.mediators = new MediatorContextStats(data.mediators);
		this.scams = new ScamStats(data.scams);
		this.blacklist = new BlacklistStats(data.blacklist);
	}

	/**
	 * Converts the GuildStats object into a plain JSON-serializable object.
	 *
	 * @returns A plain object representation of the GuildStats instance.
	 */
	public toJSON() {
		const data: APIGuildsStats = toSnakeCase<GuildsStats, APIGuildsStats>(this);
		return data;
	}
}
