import type { APIGuildBetTax } from "@quikcess/bet-api-types/v1";
import type { Guild } from "../../../guild";

/**
 * Defines queue rules within a guild.
 */
export class GuildBetTax {
	/** Name of the queue. */
	public percentage: number;
	public minValue: number;
	public maxValue: number;

	/** Reference to the parent Guild object. */
	private readonly guild: Guild;

	constructor(guild: Guild, data: APIGuildBetTax) {
		this.percentage = data.percentage;
		this.minValue = data.min_value;
		this.maxValue = data.max_value;
		this.guild = guild;
	}

	public toJSON() {
		const data: APIGuildBetTax = {
			percentage: this.percentage,
			min_value: this.minValue,
			max_value: this.maxValue,
		};
		return data;
	}
}
