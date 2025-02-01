import type { APIGuildUserWallet } from "@quikcess/bet-api-types/v1";

/**
 * Class representing the wallet information of the user.
 */
export class GuildUserWallet {
	/** The amount of credits the user has. */
	public credits: number;

	constructor(data: APIGuildUserWallet) {
		this.credits = data.credits;
	}

	/**
	 * Converts the Wallet instance to a plain JSON object.
	 */
	public toJSON() {
		return {
			credits: this.credits,
		};
	}
}
