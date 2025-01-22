import { assertBlacklist } from "@/assertions/blacklist";
import { toSnakeCase } from "@/utils/cases/index";
import type {
	APIBlacklist,
	BlacklistStatus,
	BlacklistTargetType,
} from "@quikcess/bet-api-types/v1";

/**
 * Represents a blacklist entry.
 */
export class Blacklist {
	/** The guild (server) ID associated with the blacklist entry. */
	guildId: string;
	/** The target ID that is blacklisted (e.g., user ID or channel ID). */
	targetId: string;
	/** The type of the blacklisted target (e.g., user, channel). */
	targetType: BlacklistTargetType;
	/** The current status of the blacklist entry. */
	status: BlacklistStatus;
	/** The ID of the user who added this blacklist entry. */
	addedBy: string;
	/** The reason for adding this blacklist entry. */
	reason: string;
	/** The timestamp when the blacklist entry was created. */
	createdAt: Date;
	/** The timestamp when the blacklist entry was last updated. */
	updatedAt: Date;

	/**
	 * Constructs a new instance of a blacklist entry.
	 *
	 * @constructor
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
	 * Creates a new Blacklist instance from a given APIBlacklist object.
	 *
	 * @param data - The APIBlacklist object to convert.
	 * @returns A new instance of the Blacklist class.
	 */
	public static from(data: APIBlacklist): Blacklist {
		return new Blacklist(data);
	}

	/**
	 * Converts the Blacklist instance back into an APIBlacklist object.
	 *
	 * @returns The APIBlacklist object representation of this instance.
	 */
	public toJSON(): APIBlacklist {
		const data: APIBlacklist = toSnakeCase<Blacklist, APIBlacklist>(this);
		return data;
	}
}
