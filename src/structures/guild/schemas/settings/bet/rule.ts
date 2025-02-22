import type { APIGuildQueueRules } from "@quikcess/bet-api-types/v1";
import type { Guild } from "#quikcess/structures/guild/guild";

/**
 * Defines queue rules within a guild.
 */
export class GuildQueueRule {
	/** Name of the queue. */
	public format: string;

	/** List of channel IDs associated with the queue. */
	public channelId: string | null;

	/** Reference to the parent Guild object. */
	private readonly guild: Guild;

	constructor(guild: Guild, data: APIGuildQueueRules) {
		this.format = data.format;
		this.channelId = data.channel_id;
		this.guild = guild;
	}

	public toJSON() {
		const data: APIGuildQueueRules = {
			format: this.format,
			channel_id: this.channelId,
		};
		return data;
	}
}
