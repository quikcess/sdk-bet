import type { APIGuildLogs } from "@quikcess/bet-api-types/v1";
import { toSnakeCase } from "#quikcess/utils/cases";
import { GuildLogsBets } from "./bets";
import { GuildLogsManagements } from "./managements";
import { GuildLogsSystems } from "./systems";

/**
 * Represents the complete structure of guild logs.
 */
export class GuildLogs {
	/** Logs related to bets in the guild. */
	public bets: GuildLogsBets;

	/** Logs related to guild management activities. */
	public managements: GuildLogsManagements;

	/** Logs related to system events in the guild. */
	public systems: GuildLogsSystems;

	constructor(data: APIGuildLogs) {
		this.bets = new GuildLogsBets(data.bets);
		this.managements = new GuildLogsManagements(data.managements);
		this.systems = new GuildLogsSystems(data.systems);
	}

	public toJSON() {
		const data: APIGuildLogs = toSnakeCase<GuildLogs, APIGuildLogs>(this);
		return data;
	}
}
