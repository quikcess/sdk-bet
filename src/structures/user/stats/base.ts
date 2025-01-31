import type { APIUserStats } from "@quikcess/bet-api-types/v1";
import { UserCommonStatsBase } from "./common";

/**
 * Base class representing stats related to the user.
 */
export class UserStatsBase extends UserCommonStatsBase {
	/** Number of times punished. */
	public punishments: number;

	constructor(data: APIUserStats) {
		super(data);
		this.punishments = data.punishments;
	}

	/**
	 * Converts the StatsBase instance to a plain JSON object.
	 */
	public toJSON() {
		return {
			...super.toJSON(),
			punishments: this.punishments,
		};
	}
}

// For now it's just to make sense.
export class UserStats extends UserStatsBase {}
export class GuildUserStats extends UserStatsBase {}
