import type { APIGuildMediatorPix } from "@quikcess/bet-api-types/v1";

/**
 * Class representing the Pix data for a guild's mediator, including the key, name, and message.
 */
export class GuildMediatorPix {
	/** The Pix key associated with the guild's mediator, or null if not available. */
	public key: string | null;

	/** The name associated with the Pix key for the guild's mediator, or null if not available. */
	public name: string | null;

	/** The message related to the Pix key for the guild's mediator, or null if not available. */
	public message: string | null;

	/** Constructor that initializes the GuildMediatorPix instance with the provided data. */
	constructor(data: APIGuildMediatorPix) {
		this.key = data.key;
		this.name = data.name;
		this.message = data.message;
	}

	/** Converts the GuildMediatorPix instance to a plain JSON object. */
	public toJSON() {
		return {
			key: this.key,
			name: this.name,
			message: this.message,
		};
	}
}
