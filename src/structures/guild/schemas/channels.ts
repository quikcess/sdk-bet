import type { APIGuildChannels } from "@quikcess/bet-api-types/v1";
import type { Guild } from "../guild";

/**
 * Represents the guild's channels, including queue rules.
 */
export class GuildChannels {
	/** Identifier for the blacklist, if applicable. */
	public blacklistId: string | null;

	/** Identifier for the scam, if applicable. */
	public scamId: string | null;

	/** List of command-related channel IDs. */
	public commandIds: string[];

	/** Reference to the parent Guild object. */
	private readonly guild: Guild;

	constructor(guild: Guild, data: APIGuildChannels) {
		this.blacklistId = data.blacklist_id;
		this.scamId = data.scam_id;
		this.commandIds = data.command_ids;
		this.guild = guild;
	}

	/**
	 * Adds channels to a specific type.
	 * @param channelType The type of channel to modify.
	 * @param channelIds One or more channel IDs to add.
	 * @param options Additional options, such as max allowed channels.
	 * @returns A boolean indicating whether the operation was successful.
	 */
	public async addChannels(
		channelType: keyof this,
		channelIds: string | string[],
		options: { maxChannels?: number } = {},
	): Promise<boolean> {
		if (!(channelType in this)) return false;

		const ids = Array.isArray(channelIds) ? channelIds : [channelIds];
		const { maxChannels } = options;

		if (Array.isArray(this[channelType])) {
			const uniqueChannels = new Set([
				...(this[channelType] as string[]),
				...ids,
			]);
			if (maxChannels && uniqueChannels.size > maxChannels) return false;
			(this[channelType] as string[]) = [...uniqueChannels];
		} else {
			(this[channelType] as string | null) = ids[0] ?? null;
		}

		try {
			await this.guild.update({ channels: this.toJSON() });
			return true;
		} catch (error) {
			console.error("[SDK] Error updating channels:", error);
			throw false;
		}
	}

	/**
	 * Removes channels from a specific type.
	 * @param channelType The type of channel to modify.
	 * @param channelIds One or more channel IDs to remove.
	 * @returns A boolean indicating whether the operation was successful.
	 */
	public async removeChannels(
		channelType: keyof this,
		channelIds: string | string[],
	): Promise<boolean> {
		if (!(channelType in this)) return false;

		const ids = Array.isArray(channelIds) ? channelIds : [channelIds];

		if (Array.isArray(this[channelType])) {
			(this[channelType] as string[]) = (this[channelType] as string[]).filter(
				(id) => !ids.includes(id),
			);
		} else if (
			typeof this[channelType] === "string" &&
			ids.includes(this[channelType] as string)
		) {
			(this[channelType] as string | null) = null;
		}

		try {
			await this.guild.update({ channels: this.toJSON() });
			return true;
		} catch (error) {
			console.error("[SDK] Error removing channels:", error);
			throw false;
		}
	}

	public toJSON(): APIGuildChannels {
		return {
			blacklist_id: this.blacklistId,
			scam_id: this.scamId,
			command_ids: this.commandIds,
		};
	}
}
