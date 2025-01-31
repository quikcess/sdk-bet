import { UserStats } from "./stats/base";

/**
 * Class representing a user.
 */
export class User {
	/** The ID of the user. */
	public userId: string;

	/** Stats of the user. */
	public stats: UserStats;

	/** The date and time when the user was created. */
	public createdAt: Date;

	/** The date and time when the user was last updated. */
	public updatedAt: Date;

	/**
	 * Constructor to initialize a User instance with the provided data.
	 *
	 * @param data The data to initialize the User.
	 */
	constructor(data: any) {
		this.userId = data.user_id;
		this.stats = new UserStats(data.stats);
		this.createdAt = new Date(data.created_at);
		this.updatedAt = new Date(data.updated_at);
	}

	/**
	 * Converts the User instance to a plain JSON object.
	 *
	 * @returns The JSON representation of the User instance.
	 */
	public toJSON() {
		return {
			user_id: this.userId,
			stats: this.stats.toJSON(),
			created_at: this.createdAt.toISOString(),
			updated_at: this.updatedAt.toISOString(),
		};
	}
}
