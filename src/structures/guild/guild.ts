import type { APIGuild } from "@quikcess/bet-api-types/v1";
import { assertGuild } from "#quikcess/assertions";
import type { Betting } from "#quikcess/index";
import { GuildBetManager } from "#quikcess/managers/bet/guild";
import { GuildBlacklistManager } from "#quikcess/managers/blacklist/guild";
import { GuildMediatorManager } from "#quikcess/managers/mediator/guild";
import { GuildQueueManager } from "#quikcess/managers/queue";
import { GuildScamManager } from "#quikcess/managers/scam/guild";
import { GuildUserManager } from "#quikcess/managers/user/guild";
import type { GuildUpdateData } from "#quikcess/types/guild";
import { toSnakeCase } from "#quikcess/utils/cases";
import { GuildChannels } from "./schemas/channels";
import { GuildLogs } from "./schemas/logs/logs";
import { GuildPermission } from "./schemas/permission";

/**
 * Represents a guild with all its properties and managers.
 */
export class Guild {
	/** Manages bets within the guild. */
	public readonly bets: GuildBetManager;

	/** Manages queues within the guild. */
	public readonly queues: GuildQueueManager;

	/** Manages users within the guild. */
	public readonly users: GuildUserManager;

	/** Manages mediators within the guild. */
	public readonly mediators: GuildMediatorManager;

	/** Manages blacklist within the guild. */
	public readonly blacklist: GuildBlacklistManager;

	/** Manages scams within the guild. */
	public readonly scams: GuildScamManager;

	/** Unique identifier of the guild. */
	public readonly guildId: string;

	/** List of active systems in the guild. */
	public systems: number[];

	/** List of permissions associated with the guild. */
	public permissions: GuildPermission[];

	/** Manages the guild's channels and their configurations. */
	public channels: GuildChannels;

	/** Stores logs related to the guild's activities. */
	public logs: GuildLogs;

	/** Timestamp of when the guild was created. */
	public createdAt: Date;

	/** Timestamp of when the guild was last updated. */
	public updatedAt: Date;

	constructor(
		/** Reference to the main betting client. */
		public readonly client: Betting,
		data: APIGuild,
	) {
		assertGuild(data, "GUILD_DATA");

		this.guildId = data.guild_id;
		this.systems = data.systems;
		this.permissions = data.permissions.map(
			(perm) => new GuildPermission(perm),
		);
		this.channels = new GuildChannels(data.channels);
		this.logs = new GuildLogs(data.logs);
		this.createdAt = new Date(data.created_at);
		this.updatedAt = new Date(data.updated_at);

		this.bets = new GuildBetManager(client, data.guild_id);
		this.queues = new GuildQueueManager(client, data.guild_id);
		this.users = new GuildUserManager(client, data.guild_id);
		this.mediators = new GuildMediatorManager(client, data.guild_id);
		this.blacklist = new GuildBlacklistManager(client, data.guild_id);
		this.scams = new GuildScamManager(client, data.guild_id);
	}

	async update(data: GuildUpdateData): Promise<Guild> {
		return this.client.guilds.update(this.guildId, data);
	}

	/**
	 * Converts the guild object to a JSON-compliant format.
	 * @returns The guild data formatted as an API-compatible object.
	 */
	public toJSON() {
		const data: APIGuild = toSnakeCase<Guild, APIGuild>(this);
		return data;
	}
}
