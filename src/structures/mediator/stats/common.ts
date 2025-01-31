import type { APIMediatorStats } from "@quikcess/bet-api-types/v1";
import { MediatorBilled } from "../schemas/billed";

/**
 * Common class representing the basic statistics of a mediator, including various counts related to games and billing.
 */
export class MediatorCommonStatsBase {
	/** The total number of games related to the mediator. */
	public total: number;

	/** The number of games that have started for the mediator. */
	public started: number;

	/** The number of games that have closed for the mediator. */
	public closed: number;

	/** The number of games that are pending for the mediator. */
	public pending: number;

	/** The number of games that are currently in progress for the mediator. */
	public inProgress: number;

	/** The number of games that were cancelled for the mediator. */
	public cancelled: number;

	/** The number of games that were abandoned by the mediator. */
	public abandoned: number;

	/** The number of games that were played for the mediator. */
	public played: number;

	/** The number of games that ended in a walkover for the mediator. */
	public walkover: number;

	/** The number of games that were revenged for the mediator. */
	public revenged: number;

	/** The billing information related to the mediator. */
	public billed: MediatorBilled;

	/** Constructor that initializes the MediatorStatsBase instance with the provided data. */
	constructor(data: Omit<APIMediatorStats, "punishments">) {
		this.total = data.total;
		this.started = data.started;
		this.closed = data.closed;
		this.pending = data.pending;
		this.inProgress = data.in_progress;
		this.cancelled = data.cancelled;
		this.abandoned = data.abandoned;
		this.played = data.played;
		this.walkover = data.walkover;
		this.revenged = data.revenged;
		this.billed = new MediatorBilled(data.billed);
	}

	/** Converts the MediatorStatsBase instance to a plain JSON object. */
	public toJSON() {
		return {
			total: this.total,
			started: this.started,
			closed: this.closed,
			pending: this.pending,
			in_progress: this.inProgress,
			cancelled: this.cancelled,
			abandoned: this.abandoned,
			played: this.played,
			walkover: this.walkover,
			revenged: this.revenged,
			billed: this.billed.toJSON(),
		};
	}
}
