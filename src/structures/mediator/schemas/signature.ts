import type { APIGuildMediatorSignature } from "@quikcess/bet-api-types/v1";

/**
 * Class representing the signature data for a guild's mediator, including role ID, expiration time, and autorole status.
 */
export class GuildMediatorSignature {
	/** The role ID associated with the guild's mediator signature, or null if not available. */
	public roleId: string | null;

	/** The expiration time of the mediator's signature, or null if not available. */
	public expirationTime: number | null;

	/** A flag indicating whether autorole is enabled for the mediator's signature. */
	public autorole: boolean;

	/** Constructor that initializes the GuildMediatorSignature instance with the provided data. */
	constructor(data: APIGuildMediatorSignature) {
		this.roleId = data.role_id;
		this.expirationTime = data.expiration_time;
		this.autorole = data.autorole;
	}

	/** Converts the GuildMediatorSignature instance to a plain JSON object. */
	public toJSON() {
		return {
			role_id: this.roleId,
			expiration_time: this.expirationTime,
			autorole: this.autorole,
		};
	}
}
