import { assertBlacklists } from "#quikcess/assertions";
import { Collection } from "#quikcess/structures/collection";
import type { Blacklist } from "./blacklist";

/**
 * Represents a set of blacklist entries, including pagination details and a collection of blacklist data.
 */
export class Blacklists {
	/** The current page number in a paginated result set, or null if pagination is not used. */
	public readonly currentPage: number;

	/** The total number of pages in the result set, or null if pagination is not used. */
	public readonly totalPages: number;

	/** The total number of blacklist entries available in the result set. */
	public readonly totalEntries: number;

	/** A collection of blacklist entries, mapped by their unique string identifier. */
	public readonly data: Collection<string, Blacklist>;

	/**
	 * Creates a new instance of the Blacklists class.
	 *
	 * @param currentPage - The current page number in the paginated results (default: null).
	 * @param totalPages - The total number of pages in the result set (default: null).
	 * @param totalEntries - The total number of blacklist entries available (default: 0).
	 * @param data - A collection of blacklist entries (default: an empty collection).
	 */
	constructor({
		currentPage = 0,
		totalPages = 0,
		totalEntries = 0,
		data = new Collection<string, Blacklist>(),
	}: Partial<Blacklists>) {
		assertBlacklists(data.toJSON().map((entry) => entry.toJSON()));

		this.currentPage = currentPage;
		this.totalPages = totalPages;
		this.totalEntries = totalEntries;
		this.data = data;
	}

	/**
	 * Converts the Blacklists object into a plain JSON-serializable object.
	 *
	 * @returns A plain object representation of the Blacklists instance.
	 */
	toJSON() {
		return {
			current_page: this.currentPage,
			total_pages: this.totalPages,
			total_entries: this.totalEntries,
			data: this.data.toJSON().map((entry) => entry.toJSON()), // Converts the Collection to an array of key-value pairs for serialization
		};
	}

	/**
	 * Returns a string representation of the Blacklists instance for debugging purposes.
	 *
	 * @returns A formatted string describing the Blacklists instance.
	 */
	toString() {
		return `Blacklists {
      currentPage: ${this.currentPage},
      totalPages: ${this.totalPages},
      totalEntries: ${this.totalEntries},
      data: Collection(${this.data.size}),
    }`;
	}
}
