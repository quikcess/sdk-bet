import type { APIGuildBetTax } from "@quikcess/bet-api-types/v1";
import type { Guild } from "../../../guild";
import { GuildBetTax } from "./tax";

/**
 * Defines queue rules within a guild.
 */
export class GuildBetTaxes {
	/** Name of the queue. */
	public rates: GuildBetTax[];

	/** Reference to the parent Guild object. */
	private readonly guild: Guild;

	constructor(guild: Guild, data: APIGuildBetTax[]) {
		this.rates = data.map((tax) => new GuildBetTax(guild, tax));
		this.guild = guild;
	}

	/**
	 * Adds a new tax rate to the guild's bet taxes.
	 */
	public add(data: {
		percentage: number;
		minValue: number;
		maxValue: number;
	}) {
		const existingTax = this.rates.find(
			(tax) => tax.percentage === data.percentage,
		);

		if (existingTax) {
			existingTax.minValue = data.minValue;
			existingTax.maxValue = data.maxValue;
		} else {
			this.rates.push(
				new GuildBetTax(this.guild, {
					percentage: data.percentage,
					min_value: data.minValue,
					max_value: data.maxValue,
				}),
			);
		}

		return this.guild.update({
			settings: {
				bet: {
					...this.guild.settings.bet.toJSON(),
					taxes: this.toJSON(),
				},
			},
		});
	}

	/**
	 * Removes tax rates from the guild's bet taxes based on the percentages.
	 */
	public remove(percentages: number | number[]) {
		const percentageArray = Array.isArray(percentages)
			? percentages
			: [percentages];
		this.rates = this.rates.filter(
			(tax) => !percentageArray.includes(tax.percentage),
		);

		return this.guild.update({
			settings: {
				bet: {
					...this.guild.settings.bet.toJSON(),
					taxes: this.toJSON(),
				},
			},
		});
	}

	public toJSON() {
		const data: APIGuildBetTax[] = this.rates.map((tax) => tax.toJSON());
		return data;
	}
}
