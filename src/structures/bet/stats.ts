import type { APIBetStats } from "@quikcess/bet-api-types/v1";
import { BetBilled } from "./billed";

/**
 * Represents aggregated metrics for bets, including totals, statuses, and billing.
 */
export class BetStats {
	/** Total number of bets. */
	public readonly total: number;

	/** Number of bets that were started. */
	public readonly started: number;

	/** Number of bets that were closed. */
	public readonly closed: number;

	/** Number of bets currently pending. */
	public readonly pending: number;

	/** Number of bets currently in progress. */
	public readonly inProgress: number;

	/** Number of cancelled bets. */
	public readonly cancelled: number;

	/** Number of abandoned bets. */
	public readonly abandoned: number;

	/** Number of bets with winners. */
	public readonly played: number;

	/** Number of walkover bets. */
	public readonly walkover: number;

	/** Number of revenge bets. */
	public readonly revenged: number;

	/** Billing information associated with the bets. */
	public readonly billed: BetBilled;

	/**
	 * Initializes a BetStats instance with API data.
	 * Ensures all metrics are mapped correctly from the API response.
	 *
	 * @param data - The raw API data containing bet metrics.
	 */
	constructor(data: APIBetStats) {
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
		this.billed = new BetBilled(data.billed);
	}
}
