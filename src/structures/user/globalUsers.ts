import { assertGlobalUsers } from "#quikcess/assertions";
import { Collection } from "../collection";
import type { User } from "./globalUser";

/**
 * Class representing a collection of Users, with pagination and metadata.
 */
export class Users {
	/** List of users. */
	public data: Collection<string, User>;

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
		data = new Collection<string, User>(),
	}: Partial<Users>) {
		assertGlobalUsers(data.toJSON().map((entry) => entry.toJSON()));

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
			data: this.data.toJSON().map((entry) => entry.toJSON()),
			current_page: this.currentPage,
			total_pages: this.totalPages,
			total_users: this.totalUsers,
		};
	}
}
