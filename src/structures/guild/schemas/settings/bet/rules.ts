import type { APIGuildQueueRules } from "@quikcess/bet-api-types/v1";
import type { Guild } from "../../../guild";
import { GuildQueueRule } from "./rule";

/**
 * Defines queue rules within a guild.
 */
export class GuildQueueRules {
	/** List of channel IDs associated with the queue. */
	public channels: GuildQueueRule[];

	/** Reference to the parent Guild object. */
	private readonly guild: Guild;

	constructor(guild: Guild, data: APIGuildQueueRules[]) {
		this.channels = data.map((rule) => new GuildQueueRule(guild, rule));
		this.guild = guild;
	}

	/**
	 * Add a channel to the queue rule
	 * @param channelId Channel ID to add
	 * @param format Queue format to set the channel
	 */
	public async addChannel(channelId: string, format: string): Promise<void> {
		const rule = this.channels.find((r) => r.format === format);
		if (!rule) {
			this.channels.push(
				new GuildQueueRule(this.guild, {
					channel_id: channelId,
					format: format,
				}),
			);
		} else {
			rule.channelId = channelId;
		}

		await this.guild.update({
			settings: {
				bet: {
					...this.guild.settings.bet.toJSON(),
					queue_rules: this.toJSON(),
				},
			},
		});
	}

	/**
	 * Remove the channels from the queue rule
	 * @param formats Queue names to remove the channels
	 */
	public async removeChannel(...formats: string[]): Promise<void> {
		for (const format of formats) {
			const index = this.channels.findIndex((r) => r.format === format);
			if (index !== -1) this.channels.splice(index, 1);
		}

		await this.guild.update({
			settings: {
				bet: {
					...this.guild.settings.bet.toJSON(),
					queue_rules: this.toJSON(),
				},
			},
		});
	}

	public toJSON(): APIGuildQueueRules[] {
		return this.channels.map((channel) => channel.toJSON());
	}
}
