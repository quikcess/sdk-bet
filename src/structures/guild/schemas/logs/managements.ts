import type { APIGuildLogsManagements } from "@quikcess/bet-api-types/v1";
import { toSnakeCase } from "#quikcess/utils/cases";

/**
 * Represents management logs within the guild.
 */
export class GuildLogsManagements {
	/** Logs related to wins. */
	public wins: string | null;

	/** Logs related to losses. */
	public loses: string | null;

	/** Logs related to credits transactions. */
	public credits: string | null;

	constructor(data: APIGuildLogsManagements) {
		this.wins = data.wins;
		this.loses = data.loses;
		this.credits = data.credits;
	}

	public toJSON() {
		const data: APIGuildLogsManagements = toSnakeCase<
			GuildLogsManagements,
			APIGuildLogsManagements
		>(this);
		return data;
	}
}
