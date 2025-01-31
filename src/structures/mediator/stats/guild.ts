import type { APIGuildMediatorContextStats } from "@quikcess/bet-api-types/v1";
import { MediatorCommonStatsBase } from "./common";

/**
 * Class representing the statistics for a guild's mediator, extending the basic statistics with specific guild context data.
 */
export class GuildMediatorContextStats extends MediatorCommonStatsBase {
	/** The unique identifier of the mediator. */
	public mediatorId: string | null;

	/** The unique identifier of the guild. */
	public guildId: string;

	/** Constructor that initializes the GuildMediatorStats instance with the provided data. */
	constructor(data: APIGuildMediatorContextStats) {
		super(data);
		this.mediatorId = data.mediator_id;
		this.guildId = data.guild_id;
	}

	/** Converts the GuildMediatorStats instance to a plain JSON object. */
	public toJSON() {
		return {
			...super.toJSON(),
			mediator_id: this.mediatorId,
			guild_id: this.guildId,
		};
	}
}
