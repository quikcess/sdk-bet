import type { APIGuildSettings } from "@quikcess/bet-api-types/v1";
import type { Guild } from "../../guild";
import { GuildBetSettings } from "./bet/settings";

/**
 * Represents the guild's channels, including queue rules.
 */
export class GuildSettings {
	/** Reference to the bet object. */
	public readonly bet: GuildBetSettings;

	/** Reference to the parent Guild object. */
	private readonly guild: Guild;

	constructor(guild: Guild, data: APIGuildSettings) {
		this.bet = new GuildBetSettings(guild, data.bet);
		this.guild = guild;
	}

	public toJSON(): APIGuildSettings {
		return {
			bet: this.bet.toJSON(),
		};
	}
}
