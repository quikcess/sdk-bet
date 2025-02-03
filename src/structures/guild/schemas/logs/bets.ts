import type { APIGuildLogsBets } from "@quikcess/bet-api-types/v1";
import { toSnakeCase } from "#quikcess/utils/cases";

/**
 * Represents bet-related logs within the guild.
 */
export class GuildLogsBets {
	/** Log entry for created bets. */
	public created: string | null;

	/** Log entry for cancelled bets. */
	public cancelled: string | null;

	/** Log entry for started bets. */
	public started: string | null;

	/** Log entry for closed bets. */
	public closed: string | null;

	/** Log entry for victory definition events. */
	public victoryDefined: string | null;

	/** Log entry for updated bets. */
	public updated: string | null;

	constructor(data: APIGuildLogsBets) {
		this.created = data.created;
		this.cancelled = data.cancelled;
		this.started = data.started;
		this.closed = data.closed;
		this.victoryDefined = data.victory_defined;
		this.updated = data.updated;
	}

	public toJSON() {
		const data: APIGuildLogsBets = toSnakeCase<GuildLogsBets, APIGuildLogsBets>(
			this,
		);
		return data;
	}
}
