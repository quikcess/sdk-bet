import type { APIGuildUserScores } from "@quikcess/bet-api-types/v1";

/**
 * Class representing the scores of the user.
 */
export class GuildUserScores {
	/** Number of wins the user has. */
	public wins: number;

	/** Number of losses the user has. */
	public loses: number;

	/** Number of consecutive wins or losses. */
	public consecutives: number;

	constructor(data: APIGuildUserScores) {
		this.wins = data.wins;
		this.loses = data.loses;
		this.consecutives = data.consecutives;
	}

	/**
	 * Converts the Scores instance to a plain JSON object.
	 */
	public toJSON() {
		return {
			wins: this.wins,
			loses: this.loses,
			consecutives: this.consecutives,
		};
	}
}
