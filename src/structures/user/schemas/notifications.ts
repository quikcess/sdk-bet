import type { APIGuildUserNotifications } from "@quikcess/bet-api-types/v1";

/**
 * Class representing the notification settings of the user.
 */
export class GuildUserNotifications {
	/** Whether the user wants event notifications. */
	public events: boolean;

	/** Whether the user wants waiting bet notifications. */
	public waitingBets: boolean;

	constructor(data: APIGuildUserNotifications) {
		this.events = data.events;
		this.waitingBets = data.waiting_bets;
	}

	/**
	 * Converts the Notifications instance to a plain JSON object.
	 */
	public toJSON() {
		return {
			events: this.events,
			waiting_bets: this.waitingBets,
		};
	}
}
