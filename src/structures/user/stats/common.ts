import type { APIUserStats } from "@quikcess/bet-api-types/v1";
import { UserBilled } from "../schemas/billed";

/**
 * Common class representing stats related to the user.
 */
export class UserCommonStatsBase {
	/** Total number of events. */
	public total: number;

	/** Number of events started. */
	public started: number;

	/** Number of events closed. */
	public closed: number;

	/** Number of pending events. */
	public pending: number;

	/** Number of events in progress. */
	public inProgress: number;

	/** Number of confirmed events. */
	public confirmed: number;

	/** Number of cancelled events. */
	public cancelled: number;

	/** Number of abandoned events. */
	public abandoned: number;

	/** Number of events played. */
	public played: number;

	/** Number of walkover events. */
	public walkover: number;

	/** Number of revenged events. */
	public revenged: number;

	/** Number of won events. */
	public won: number;

	/** Number of lost events. */
	public lost: number;

	/** Billed information of the user. */
	public billed: UserBilled;

	constructor(data: Omit<APIUserStats, "punishments">) {
		this.total = data.total;
		this.started = data.started;
		this.closed = data.closed;
		this.pending = data.pending;
		this.inProgress = data.in_progress;
		this.confirmed = data.confirmed;
		this.cancelled = data.cancelled;
		this.abandoned = data.abandoned;
		this.played = data.played;
		this.walkover = data.walkover;
		this.revenged = data.revenged;
		this.won = data.won;
		this.lost = data.lost;
		this.billed = new UserBilled(data.billed);
	}

	/**
	 * Converts the StatsBase instance to a plain JSON object.
	 */
	public toJSON() {
		return {
			total: this.total,
			started: this.started,
			closed: this.closed,
			pending: this.pending,
			in_progress: this.inProgress,
			confirmed: this.confirmed,
			cancelled: this.cancelled,
			abandoned: this.abandoned,
			played: this.played,
			walkover: this.walkover,
			revenged: this.revenged,
			won: this.won,
			lost: this.lost,
			billed: this.billed.toJSON(),
		};
	}
}
