import type { APIBetLog } from "@quikcess/bet-api-types/v1";

/**
 * Represents the log URLs associated with a bet, such as when the bet was created, started, or closed.
 */
export class BetLog {
	/** The URL for the closed bet log. */
	public readonly closedUrl: string | null;

	/** The URL for the created bet log. */
	public readonly createdUrl: string | null;

	/** The URL for the started bet log. */
	public readonly startedUrl: string | null;

	/** The URL for the victory bet log. */
	public readonly victoryUrl: string | null;

	/**
	 * Initializes the BetLog object with API data.
	 * Validates and converts the URL strings to URL objects.
	 *
	 * @param data - Raw API data representing the bet log URLs.
	 */
	constructor(data: APIBetLog) {
		// Validate and convert string URLs to URL objects
		this.closedUrl = data.closed_url;
		this.createdUrl = data.created_url;
		this.startedUrl = data.started_url;
		this.victoryUrl = data.victory_url;
	}

	/**
	 * Returns the full log URL for a specific event.
	 *
	 * @param event - The event type ('created', 'started', 'closed', 'victory').
	 * @returns The URL associated with the given event.
	 */
	public getLogUrl(
		event: "created" | "started" | "closed" | "victory",
	): string | null {
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
