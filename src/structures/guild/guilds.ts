import { assertGuilds } from "#quikcess/assertions";
import { Collection } from "#quikcess/structures/collection";
import type { Guild } from "./guild";

/**
 * Represents a collection of guilds, including pagination details and a collection of guild data.
 */
export class Guilds {
	/** The current page number in a paginated result set, or null if pagination is not used. */
	public readonly currentPage: number;

	/** The total number of pages in the result set, or null if pagination is not used. */
	public readonly totalPages: number;

	/** The total number of guilds available in the result set. */
	public readonly totalGuilds: number;

	/** A collection of guilds, mapped by their unique string identifier. */
	public readonly data: Collection<string, Guild>;

	/**
	 * Creates a new instance of the Guilds class.
	 *
	 * @param currentPage - The current page number in the paginated results (default: null).
	 * @param totalPages - The total number of pages in the result set (default: null).
	 * @param totalGuilds - The total number of guilds available (default: 0).
	 * @param data - A collection of guilds (default: an empty collection).
	 */
	constructor({
		currentPage = 0,
		totalPages = 0,
		totalGuilds = 0,
		data = new Collection<string, Guild>(),
	}: Partial<Guilds>) {
		assertGuilds(data.values().toArray());

		this.currentPage = currentPage;
		this.totalPages = totalPages;
		this.totalGuilds = totalGuilds;
		this.data = data;
	}

	/**
	 * Converts the Guilds object into a plain JSON-serializable object.
	 *
	 * @returns A plain object representation of the Guilds instance.
	 */
	toJSON() {
		return {
			current_page: this.currentPage,
			total_pages: this.totalPages,
			total_guilds: this.totalGuilds,
			data: Array.from(this.data.entries()), // Converts the Collection to an array of key-value pairs for serialization
		};
	}

	/**
	 * Returns a string representation of the Guilds instance for debugging purposes.
	 *
	 * @returns A formatted string describing the Guilds instance.
	 */
	toString() {
		return `Guilds {
      currentPage: ${this.currentPage},
      totalPages: ${this.totalPages},
      totalGuilds: ${this.totalGuilds},
      data: Collection(${this.data.size}),
    }`;
	}
}
