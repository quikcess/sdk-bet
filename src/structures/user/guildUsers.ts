import { Collection } from "../collection";
import type { GuildUser } from "./guildUser";

/**
 * Class representing a collection of Users, with pagination and metadata.
 */
export class GuildUsers {
	/** List of guild users. */
	public data: Collection<string, GuildUser>;

	/** The current page number in the paginated data. */
	public currentPage: number;

	/** The total number of pages in the paginated data. */
	public totalPages: number;

	/** The total number of users across all pages. */
	public totalUsers: number;

	/**
	 * Constructor to initialize a Users instance with provided data.
	 *
	 * @param data The data to initialize the Users.
	 */
	constructor({
		currentPage = 0,
		totalPages = 0,
		totalUsers = 0,
		data = new Collection<string, GuildUser>(),
	}: Partial<GuildUsers>) {
		this.data = data;
		this.currentPage = currentPage;
		this.totalPages = totalPages;
		this.totalUsers = totalUsers;
	}

	/**
	 * Converts the Users instance to a plain JSON object.
	 *
	 * @returns The JSON representation of the Users instance.
	 */
	public toJSON() {
		return {
			data: this.data.map((user) => user.toJSON()),
			current_page: this.currentPage,
			total_pages: this.totalPages,
			total_users: this.totalUsers,
		};
	}
}
