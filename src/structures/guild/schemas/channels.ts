import type {
	APIGuildChannels,
	APIGuildQueueRules,
} from "@quikcess/bet-api-types/v1";
import { toSnakeCase } from "#quikcess/utils/cases";
import type { Guild } from "../guild";

/**
 * Represents the guild's channels, including queue rules.
 */
export class GuildChannels {
	/** List of parent thread IDs in the guild. */
	public parentThreadIds: string[];

	/** Identifier for the blacklist, if applicable. */
	public blacklistId: string | null;

	/** Identifier for the scam, if applicable. */
	public scamId: string | null;

	/** List of command-related channel IDs. */
	public commandIds: string[];

	/** Rules defining how queues operate in the guild. */
	public queueRules: GuildQueueRules[];

	/** Reference to the parent Guild object. */
	private readonly guild: Guild;

	constructor(guild: Guild, data: APIGuildChannels) {
		this.parentThreadIds = data.parent_thread_ids;
		this.blacklistId = data.blacklist_id;
		this.scamId = data.scam_id;
		this.commandIds = data.command_ids;
		this.queueRules = data.queue_rules.map(
			(rule) => new GuildQueueRules(guild, rule),
		);
		this.guild = guild;
	}

	/**
	 * Add channels based on channel type
	 * @param channelType Type of channel to add to
	 * @param channelIds Channel ID(s) to add
	 * @returns Promise<boolean> indicating if the operation was successful
	 */
	public async addChannels(
		channelType: keyof GuildChannels,
		channelIds: string | string[],
		queue_name?: string,
	): Promise<boolean> {
		if (!channelType) return false;

		const ids = Array.isArray(channelIds) ? channelIds : [channelIds];

		if (channelType === "queueRules" && queue_name) {
			if (!this.queueRules) this.queueRules = [];
			for (const id of ids) {
				const rule = new GuildQueueRules(this.guild, {
					queue_name,
					channel_id: id,
				});
				this.queueRules.push(rule);
			}
		} else if (
			channelType === "parentThreadIds" ||
			channelType === "commandIds"
		) {
			const uniqueChannels = new Set([...this[channelType], ...ids]);
			this[channelType] = Array.from(uniqueChannels);
		} else if (channelType === "blacklistId" || channelType === "scamId") {
			this[channelType] = ids[0];
		}

		try {
			await this.guild.update({ channels: this.toJSON() });
			return true;
		} catch (error) {
			return false;
		}
	}

	/**
	 * Remove channels based on channel type
	 * @param channelType Type of channel to remove from
	 * @param channelIds Channel ID(s) to remove
	 * @returns Promise<boolean> indicating if the operation was successful
	 */
	public async removeChannels(
		channelType: keyof GuildChannels,
		channelIds: string | string[],
	): Promise<boolean> {
		if (!channelType) return false;

		const ids = Array.isArray(channelIds) ? channelIds : [channelIds];

		if (channelType === "queueRules") {
			this.queueRules = this.queueRules.filter(
				(rule) => rule.channelId !== null && !ids.includes(rule.channelId),
			);
		} else if (
			channelType === "parentThreadIds" ||
			channelType === "commandIds"
		) {
			this[channelType] = this[channelType].filter((id) => !ids.includes(id));
		} else if (channelType === "blacklistId" || channelType === "scamId") {
			if (ids.includes(this[channelType] as string)) {
				this[channelType] = null;
			}
		}
		try {
			await this.guild.update({ channels: this.toJSON() });
			return true;
		} catch (error) {
			return false;
		}
	}
	public toJSON() {
		const data: APIGuildChannels = toSnakeCase<GuildChannels, APIGuildChannels>(
			this,
		);
		return data;
	}
}

/**
 * Defines queue rules within a guild.
 */
export class GuildQueueRules {
	/** Name of the queue. */
	public queueName: string;

	/** List of channel IDs associated with the queue. */
	public channelId: string | null;

	/** Reference to the parent Guild object. */
	private readonly guild: Guild;

	constructor(guild: Guild, data: APIGuildQueueRules) {
		this.queueName = data.queue_name;
		this.channelId = data.channel_id;
		this.guild = guild;
	}

	/**
	 * Add a channel to the queue rule
	 * @param channelId Channel ID to add
	 */
	public async addChannel(channelId: string): Promise<void> {
		this.channelId = channelId;
		await this.guild.update({ channels: this.guild.channels.toJSON() });
	}

	/**
	 * Remove the channel from the queue rule
	 */
	public async removeChannel(): Promise<void> {
		this.channelId = null;
		await this.guild.update({ channels: this.guild.channels.toJSON() });
	}

	public toJSON() {
		const data: APIGuildQueueRules = toSnakeCase<
			GuildQueueRules,
			APIGuildQueueRules
		>(this);
		return data;
	}
}
