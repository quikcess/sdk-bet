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
  }

  /**
   * Gets the log this bet
   */
  async getLogs(): Promise<string> {
    return "logs";
  }
}
