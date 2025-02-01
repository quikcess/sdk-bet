import type { APIGuildUser } from "@quikcess/bet-api-types/v1";
import { assertGuildUser } from "#quikcess/assertions";
import { GuildUserNotifications } from "./schemas/notifications";
import { GuildUserScores } from "./schemas/scores";
import { GuildUserWallet } from "./schemas/wallet";
import { GuildUserStats } from "./stats/base";

/**
 * Class representing a user in a specific guild.
 */
export class GuildUser {
	/** The ID of the user in the guild. */
	public userId: string;

	/** The ID of the guild the user belongs to. */
	public guildId: string;

	/** Wallet information of the guild user. */
	public wallet: GuildUserWallet;

	/** Stats of the guild user. */
	public stats: GuildUserStats;

	/** Scores of the guild user. */
	public scores: GuildUserScores;

	/** Notification settings of the guild user. */
	public notifications: GuildUserNotifications;

	/** The date and time when the user was created. */
	public createdAt: Date;

	/** The date and time when the user was last updated. */
	public updatedAt: Date;

	/**
	 * Constructor to initialize a GuildUser instance with the provided data.
	 *
	 * @param data The data to initialize the GuildUser.
	 */
	constructor(data: APIGuildUser) {
		assertGuildUser(data);

		this.userId = data.user_id;
		this.guildId = data.guild_id;
		this.wallet = new GuildUserWallet(data.wallet);
		this.stats = new GuildUserStats(data.stats);
		this.scores = new GuildUserScores(data.scores);
		this.notifications = new GuildUserNotifications(data.notifications);
		this.createdAt = new Date(data.created_at);
		this.updatedAt = new Date(data.updated_at);
	}

	/**
	 * Converts the GuildUser instance to a plain JSON object.
	 *
	 * @returns The JSON representation of the GuildUser instance.
	 */
	public toJSON() {
		return {
			user_id: this.userId,
			guild_id: this.guildId,
			wallet: this.wallet.toJSON(),
			stats: this.stats.toJSON(),
			scores: this.scores.toJSON(),
			notifications: this.notifications.toJSON(),
			created_at: this.createdAt.toISOString(),
			updated_at: this.updatedAt.toISOString(),
		};
	}
}
