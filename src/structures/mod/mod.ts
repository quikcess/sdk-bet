import type {
	APIGuildMod,
	APIGuildModData,
	GuildModType,
} from "@quikcess/bet-api-types/v1";
import { assertGuildMod } from "#quikcess/assertions";
import { toSnakeCase } from "#quikcess/utils/cases";

/**
 * Represents a guild mod with all its properties and managers.
 */
export class GuildMod {
	/** The ID of the guild this mod belongs to. */
	public guildId: string;

	/** The unique identifier of this mod. */
	public type: GuildModType;

	/** The tag identifier for this mod. */
	public tag: string;

	/** The data associated with this mod. */
	public data: APIGuildModData;

	/** The timestamp when this mod was created. */
	public createdAt: Date;

	/** The timestamp when this mod was last updated. */
	public updatedAt: Date;

	constructor(data: APIGuildMod) {
		assertGuildMod(data, "MOD_DATA");
		this.guildId = data.guild_id;
		this.tag = data.tag;
		this.type = data.type;
		this.data = data.data;
		this.createdAt = new Date(data.created_at);
		this.updatedAt = new Date(data.updated_at);
	}

	/**
	 * Converts the guild mod object to a JSON-compliant format.
	 * @returns The guild mod data formatted as an API-compatible object.
	 */
	public toJSON() {
		const data: APIGuildMod = toSnakeCase<GuildMod, APIGuildMod>(this);
		return data;
	}
}
