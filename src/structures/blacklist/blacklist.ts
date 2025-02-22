import type {
	APIBlacklist,
	BlacklistStatus,
	BlacklistTargetType,
} from "@quikcess/bet-api-types/v1";
import { assertBlacklist } from "#quikcess/assertions/blacklist";
import { toSnakeCase } from "#quikcess/utils/cases/index";

/**
 * Represents a blacklist entry.
 */
export class Blacklist {
	/** The ID of the guild (server) associated with this blacklist entry. */
	public readonly guildId: string;

	/** The ID of the target that is blacklisted (e.g., a user or channel ID). */
	public readonly targetId: string;

	/** The type of the blacklisted target (e.g., user, channel). */
	public readonly targetType: BlacklistTargetType;

	/** The current status of this blacklist entry. */
	public readonly status: BlacklistStatus;

	/** The ID of the user who added this blacklist entry. */
	public readonly addedBy: string;

	/** The reason provided for this blacklist entry. */
	public readonly reason: string;

	/** The timestamp when this blacklist entry was created. */
	public readonly createdAt: Date;

	/** The timestamp when this blacklist entry was last updated. */
	public readonly updatedAt: Date;

	/**
	 * Creates a new blacklist entry instance.
	 *
	 * @param data - The data used to initialize this blacklist entry.
	 */
	constructor(data: APIBlacklist) {
		assertBlacklist(data, "structures/blacklist");

		this.guildId = data.guild_id;
		this.targetId = data.target_id;
		this.targetType = data.target_type;
		this.status = data.status;
		this.addedBy = data.added_by;
		this.reason = data.reason;
		this.createdAt = new Date(data.created_at);
		this.updatedAt = new Date(data.updated_at);
	}

	/**
	 * Creates a new Blacklist instance from an APIBlacklist object.
	 *
	 * @param data - The APIBlacklist object to convert.
	 * @returns A new instance of the Blacklist class.
	 */
	public static from(data: APIBlacklist): Blacklist {
		return new Blacklist(data);
	}

	/**
	 * Converts the Blacklist instance into an APIBlacklist object.
	 *
	 * @returns An APIBlacklist object representing this instance.
	 */
	public toJSON(): APIBlacklist {
		return {
			guild_id: this.guildId,
			target_id: this.targetId,
			target_type: this.targetType,
			status: this.status,
			added_by: this.addedBy,
			reason: this.reason,
			created_at: this.createdAt.toISOString(),
			updated_at: this.updatedAt.toISOString(),
		};
	}
}
