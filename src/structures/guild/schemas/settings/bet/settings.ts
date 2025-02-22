import type { APIGuildBetSettings } from "@quikcess/bet-api-types/v1";
import type { Guild } from "../../../guild";
import { GuildQueueRules } from "./rules";
import { GuildBetTaxes } from "./taxes";

/**
 * Represents the guild's channels, including queue rules.
 */
export class GuildBetSettings {
	public queueRules: GuildQueueRules;
	public taxes: GuildBetTaxes;
	public roomPrice: number;
	public parentChannelId: string | null;
	public threshold: number;
	public startTime: number;

	/** Reference to the parent Guild object. */
	private readonly guild: Guild;

	constructor(guild: Guild, data: APIGuildBetSettings) {
		this.queueRules = new GuildQueueRules(guild, data.queue_rules);
		this.taxes = new GuildBetTaxes(guild, data.taxes);
		this.roomPrice = data.room_price;
		this.parentChannelId = data.parent_channel_id;
		this.threshold = data.threshold;
		this.startTime = data.start_time;
		this.guild = guild;
	}

	public update(
		data: Partial<{
			parentChannelId: string | null;
			roomPrice: number;
			threshold: number;
			startTime: number;
		}>,
	) {
		if (data.parentChannelId !== undefined) {
			this.parentChannelId = data.parentChannelId;
		}
		if (data.roomPrice !== undefined) {
			this.roomPrice = data.roomPrice;
		}
		if (data.threshold !== undefined) {
			this.threshold = data.threshold;
		}
		if (data.startTime !== undefined) {
			this.startTime = data.startTime;
		}
		return this.guild.update({
			settings: {
				bet: this.toJSON(),
			},
		});
	}

	public toJSON() {
		const data: APIGuildBetSettings = {
			queue_rules: this.queueRules.channels.map((channel) => channel.toJSON()),
			taxes: this.taxes.toJSON(),
			room_price: this.roomPrice,
			parent_channel_id: this.parentChannelId,
			threshold: this.threshold,
			start_time: this.startTime,
		};
		return data;
	}
}
