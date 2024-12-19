import type { APIBetAggregateMetrics } from "@quikcess/bet-api-types/v1";

/**
 * Represents aggregated metrics for bets, including totals and statuses.
 */
export class BetMetrics {
  /** Total number of bets. */
  public readonly total: number;

  /** Number of bets that were opened. */
  public readonly opened: number;

  /** Number of bets that were closed. */
  public readonly closed: number;

  /** Number of bets currently pending. */
  public readonly pending: number;

  /** Number of bets currently in progress. */
  public readonly inProgress: number;

  /**
   * Initializes a BetMetrics instance with API data.
   * Ensures all metrics are mapped correctly from the API response.
   *
   * @param data - The raw API data containing bet metrics.
   */
  constructor(data: APIBetAggregateMetrics) {
    this.total = data.total;
    this.opened = data.opened; 
    this.closed = data.closed;
    this.pending = data.pending;
    this.inProgress = data.in_progress;
  }
}
