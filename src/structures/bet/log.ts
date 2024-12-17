import type { APIBetLog } from "@quikcess/bet-api-types/v1";

/**
 * Represents the log URLs associated with a bet, such as when the bet was created, started, or closed.
 */
export class BetLog {
  /** The URL for the closed bet log. */
  public readonly closedUrl: URL;

  /** The URL for the created bet log. */
  public readonly createdUrl: URL;

  /** The URL for the started bet log. */
  public readonly startedUrl: URL;

  /** The URL for the victory bet log. */
  public readonly victoryUrl: URL;

  /**
   * Initializes the BetLog object with API data.
   * Validates and converts the URL strings to URL objects.
   *
   * @param data - Raw API data representing the bet log URLs.
   */
  constructor(data: APIBetLog) {
    // Validate and convert string URLs to URL objects
    this.closedUrl = new URL(data.closed_url);
    this.createdUrl = new URL(data.created_url);
    this.startedUrl = new URL(data.started_url);
    this.victoryUrl = new URL(data.victory_url);
  }

  /**
   * Returns the full log URL for a specific event.
   *
   * @param event - The event type ('created', 'started', 'closed', 'victory').
   * @returns The URL associated with the given event.
   */
  public getLogUrl(event: "created" | "started" | "closed" | "victory"): URL {
    switch (event) {
      case "created":
        return this.createdUrl;
      case "started":
        return this.startedUrl;
      case "closed":
        return this.closedUrl;
      case "victory":
        return this.victoryUrl;
      default:
        throw new Error("Invalid event type");
    }
  }
}