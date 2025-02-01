import type { APIGuildMediator } from "@quikcess/bet-api-types/v1";
import { assertGuildMediator } from "#quikcess/assertions";
import { GuildMediatorLimiter } from "./schemas/limiter";
import { GuildMediatorPix } from "./schemas/pix";
import { GuildMediatorSignature } from "./schemas/signature";
import { GuildMediatorStats } from "./stats/base";

/**
 * Class representing a GuildMediator, which includes information about a guild, user, and related statistics.
 */
export class GuildMediator {
	/** The user ID associated with the guild mediator. */
	public userId: string;

	/** The guild ID associated with the mediator. */
	public guildId: string;

	/** The category ID for the guild, can be null. */
	public categoryId: string | null;

	/** The Pix information related to the guild mediator. */
	public pix: GuildMediatorPix;

	/** The number of virtual accounts associated with the guild mediator. */
	public virtualAccounts: number;

	/** The uptime of the guild mediator. */
	public uptime: number;

	/** The timestamp of the last entry for the guild mediator, can be null. */
	public lastEntry: number | null;

	/** The signature information for the guild mediator. */
	public signature: GuildMediatorSignature;

	/** The limiter settings for the guild mediator. */
	public limiter: GuildMediatorLimiter;

	/** The statistics of the guild mediator. */
	public stats: GuildMediatorStats;

	/** The timestamp when the guild mediator was created. */
	public createdAt: string;

	/** The timestamp when the guild mediator was last updated. */
	public updatedAt: string;

	/**
	 * Constructor to initialize a GuildMediator instance with provided data.
	 *
	 * @param data The data to initialize the GuildMediator.
	 */
	constructor(data: APIGuildMediator) {
		assertGuildMediator(data);

		this.userId = data.user_id;
		this.guildId = data.guild_id;
		this.categoryId = data.category_id;
		this.pix = new GuildMediatorPix(data.pix);
		this.virtualAccounts = data.virtual_accounts;
		this.uptime = data.uptime;
		this.lastEntry = data.last_entry;
		this.signature = new GuildMediatorSignature(data.signature);
		this.limiter = new GuildMediatorLimiter(data.limiter);
		this.stats = new GuildMediatorStats(data.stats);
		this.createdAt = data.created_at;
		this.updatedAt = data.updated_at;
	}

	/**
	 * Converts the GuildMediator instance to a plain JSON object.
	 *
	 * @returns The JSON representation of the GuildMediator instance.
	 */
	public toJSON() {
		return {
			user_id: this.userId,
			guild_id: this.guildId,
			category_id: this.categoryId,
			pix: this.pix.toJSON(),
			virtual_accounts: this.virtualAccounts,
			uptime: this.uptime,
			last_entry: this.lastEntry,
			signature: this.signature.toJSON(),
			limiter: this.limiter.toJSON(),
			stats: this.stats.toJSON(),
			created_at: this.createdAt,
			updated_at: this.updatedAt,
		};
	}
}
