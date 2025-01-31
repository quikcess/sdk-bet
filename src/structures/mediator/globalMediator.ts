import type { APIMediator } from "@quikcess/bet-api-types/v1";
import { MediatorStats } from "./stats/base";

/**
 * Class representing a mediator with relevant information, such as user ID, uptime, and statistics.
 */
export class Mediator {
	/** The unique identifier of the user associated with the mediator. */
	public userId: string;

	/** The uptime of the mediator. */
	public uptime: number;

	/** The timestamp of the last entry for the mediator. */
	public lastEntry: number | null;

	/** The statistics associated with the mediator. */
	public stats: MediatorStats;

	/** The creation date of the mediator. */
	public createdAt: string;

	/** The last update date of the mediator. */
	public updatedAt: string;

	/** Constructor that initializes the Mediator instance with the provided data. */
	constructor(data: APIMediator) {
		this.userId = data.user_id;
		this.uptime = data.uptime;
		this.lastEntry = data.last_entry;
		this.stats = new MediatorStats(data.stats);
		this.createdAt = data.created_at;
		this.updatedAt = data.updated_at;
	}

	/** Converts the Mediator instance to a plain JSON object. */
	public toJSON() {
		return {
			user_id: this.userId,
			uptime: this.uptime,
			last_entry: this.lastEntry,
			stats: this.stats.toJSON(),
			created_at: this.createdAt,
			updated_at: this.updatedAt,
		};
	}
}
