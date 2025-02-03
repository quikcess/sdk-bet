import type { APIGuildLogsSystems } from "@quikcess/bet-api-types/v1";
import { toSnakeCase } from "#quikcess/utils/cases";

/**
 * Represents system logs for a guild.
 */
export class GuildLogsSystems {
	/** Alerts recorded in the system logs. */
	public alerts: string | null;

	/** Reports logged within the guild. */
	public reports: string | null;

	/** Resets performed in the system. */
	public resets: string | null;

	constructor(data: APIGuildLogsSystems) {
		this.alerts = data.alerts;
		this.reports = data.reports;
		this.resets = data.resets;
	}

	public toJSON() {
		const data: APIGuildLogsSystems = toSnakeCase<
			GuildLogsSystems,
			APIGuildLogsSystems
		>(this);
		return data;
	}
}
