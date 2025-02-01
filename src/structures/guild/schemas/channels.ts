import type {
	APIGuildChannels,
	APIGuildQueueRules,
} from "@quikcess/bet-api-types/v1";

/**
 * Represents the guild's channels, including queue rules.
 */
export class GuildChannels {
	/** List of parent thread IDs in the guild. */
	public parentThreadIds: string[];

	/** Identifier for the blacklist, if applicable. */
	public blacklistId: string | null;

	/** List of command-related channel IDs. */
	public commandIds: string[];

	/** Rules defining how queues operate in the guild. */
	public queueRules: GuildQueueRules[];

	constructor(data: APIGuildChannels) {
		this.parentThreadIds = data.parent_thread_ids;
		this.blacklistId = data.blacklist_id;
		this.commandIds = data.command_ids;
		this.queueRules = data.queue_rules.map((rule) => new GuildQueueRules(rule));
	}
}

/**
 * Defines queue rules within a guild.
 */
export class GuildQueueRules {
	/** Name of the queue. */
	public queueName: string;

	/** List of channel IDs associated with the queue. */
	public channelIds: string[];

	constructor(data: APIGuildQueueRules) {
		this.queueName = data.queue_name;
		this.channelIds = data.channel_ids;
	}
}
