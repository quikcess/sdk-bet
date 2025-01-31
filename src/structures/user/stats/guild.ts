import type { APIGuildUserContextStats } from "@quikcess/bet-api-types/v1";
import { UserCommonStatsBase } from "./common";

/**
 * Represents the context stats for a guild user, including guild and user-specific data.
 */
export class GuildUserContextStats extends UserCommonStatsBase {
	/** The user ID associated with the guild. */
	public user_id: string | null;

	/** The guild ID where the user is located. */
	public guild_id: string;

	constructor(data: APIGuildUserContextStats) {
		super(data);
		this.user_id = data.user_id;
		this.guild_id = data.guild_id;
	}

	/**
	 * Converts the APIGuildUserContextStats instance to a plain JSON object.
	 */
	public toJSON() {
		return {
			...super.toJSON(), // Inheriting the toJSON from APIGuildUserStats
			user_id: this.user_id,
			guild_id: this.guild_id,
		};
	}
}
