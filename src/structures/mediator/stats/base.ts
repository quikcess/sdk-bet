import type { APIMediatorStats } from "@quikcess/bet-api-types/v1";
import { MediatorCommonStatsBase } from "./common";

/**
 * Base class representing stats related to the mediator.
 */
export class MediatorStatsBase extends MediatorCommonStatsBase {
	/** Number of times punished. */
	public punishments: number;

	constructor(data: APIMediatorStats) {
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

// For now it's just to make sense:
export class MediatorStats extends MediatorStatsBase {}
export class GuildMediatorStats extends MediatorStatsBase {}
