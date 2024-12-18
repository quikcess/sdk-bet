import type { APIBetPlayer } from "@quikcess/bet-api-types/v1";

/**
 * Represents a player in a bet, including their performance stats.
 */
export class BetPlayer {
	/** The user ID of the player. */
	public readonly userId: string;

	/** The number of wins for this player. */
	public readonly wins: number;

	/** The number of losses for this player. */
	public readonly loses: number;

	/** The number of consecutive wins or losses. */
	public readonly consecutives: number;

	/**
	 * Initializes the BetPlayer object with API data.
	 * Ensures non-negative values for wins, losses, and consecutives.
	 *
	 * @param data - Raw API data representing the player.
	 */
	constructor(data: APIBetPlayer) {
		this.userId = data.user_id;
		this.wins = Math.max(0, data.wins); // Ensure non-negative wins
		this.loses = Math.max(0, data.loses); // Ensure non-negative losses
		this.consecutives = Math.max(0, data.consecutives); // Ensure non-negative consecutive stats
	}
}
