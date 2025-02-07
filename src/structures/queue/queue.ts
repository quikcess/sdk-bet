import type { APIGuildQueue, BetType } from "@quikcess/bet-api-types/v1";
import { assertGuildQueue } from "#quikcess/assertions";
import { toSnakeCase } from "#quikcess/utils/cases";

/**
 * Represents a guild queue with all its properties and managers.
 */
export class GuildQueue {
	/** The ID of the guild this queue belongs to. */
	public guildId: string;

	/** The unique identifier of this queue. */
	public queueId: string;

	/** The ID of the channel this queue is associated with. */
	public channelId: string;

	/** The type of bet this queue represents. */
	public type: BetType;

	/** The timestamp when this queue was created. */
	public createdAt: Date;

	/** The timestamp when this queue was last updated. */
	public updatedAt: Date;

	constructor(data: APIGuildQueue) {
		assertGuildQueue(data, "QUEUE_DATA");
		this.guildId = data.guild_id;
		this.queueId = data.queue_id;
		this.type = data.type;
		this.channelId = data.channel_id;
		this.createdAt = new Date(data.created_at);
		this.updatedAt = new Date(data.updated_at);
	}

	/**
	 * Converts the guild queue object to a JSON-compliant format.
	 * @returns The guild queue data formatted as an API-compatible object.
	 */
	public toJSON() {
		const data: APIGuildQueue = toSnakeCase<GuildQueue, APIGuildQueue>(this);
		return data;
	}
}
