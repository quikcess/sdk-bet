import { BetCacheService } from "@/services/cache/bet";
import type { APIBetResult, APIBetStatus } from "@quikcess/bet-api-types/v1";

/**
 * Represents the betting structure
 */
export class BetStructure {
  /** The bet id */
  public readonly betId: string;
  /** The bet status*/
  public status: APIBetStatus;
  /** The creation bet date*/
  public createdAt: Date;
  /** The update bet date*/
  public updatedAt: Date;
  /** The started bet date*/
  public startedAt: Date;
  /** The closed bet date*/
  public closedAt: Date | null;

  /** Cache service for this bet */
  public readonly cache = new BetCacheService();

  /**
   * Represents the betting structure
   *
   * @constructor
   * @param data - The data from this bet
   */
  constructor(data: APIBetResult) {
    const { betId, status } = data;

    this.betId = betId;
    this.status = status;
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
    this.startedAt = new Date(data.startedAt)
    this.closedAt = data.closedAt ? new Date(data.closedAt) : null
  }

  static from(data: APIBetResult): BetStructure {
    return new BetStructure(data);
  }

  /**
   * Gets the log this bet
   */
  async getLogs(): Promise<string> {
    return "logs";
  }
}
