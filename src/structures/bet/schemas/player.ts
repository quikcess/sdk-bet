import type { APIBetPlayer } from "@quikcess/bet-api-types/v1";

/**
 * Represents a player in a bet, including their performance stats.
 */
export class BetPlayer {
	/** The user ID of the player. */
	public readonly userId: string;

	/** Whether he was the winner or not. */
	public readonly winner: boolean | null;

	/**
	 * Initializes the BetPlayer object with API data.
	 * Ensures non-negative values for wins, losses, and consecutives.
	 *
	 * @param data - Raw API data representing the player.
	 */
	constructor(data: APIBetPlayer) {
		this.userId = data.user_id;
		this.winner = data.winner;
	}

	public static from(data: APIBetPlayer): BetPlayer {
		return new BetPlayer(data);
	}
}
