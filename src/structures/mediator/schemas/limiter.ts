import type { APIGuildMediatorLimiter } from "@quikcess/bet-api-types/v1";

/**
 * Class representing the limiter data for a guild's mediator, including simultaneous and daily limits.
 */
export class GuildMediatorLimiter {
	/** The number of simultaneous mediators allowed for the guild. */
	public simultaneous: number;

	/** The daily limit for the number of mediators allowed for the guild. */
	public daily: number;

	/** Constructor that initializes the GuildMediatorLimiter instance with the provided data. */
	constructor(data: APIGuildMediatorLimiter) {
		this.simultaneous = data.simultaneous;
		this.daily = data.daily;
	}

	/** Converts the GuildMediatorLimiter instance to a plain JSON object. */
	public toJSON() {
		return {
			simultaneous: this.simultaneous,
			daily: this.daily,
		};
	}
}
