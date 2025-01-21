import { Collection } from "@/structures/collection.js";
import type { Blacklist } from "./base.js";

/**
 * Represents the result of all blacklist entries, including pagination and a collection of blacklist data.
 */
export class AllBlacklist {
	/** The current page number of the paginated results, or null if not applicable. */
	currentPage: number | null;

	/** The total number of pages in the result set, or null if not applicable. */
	totalPages: number | null;

	/** The total number of blacklist entries in the result set. */
	totalEntries: number;

	/** A collection of blacklist entries, mapped by their string identifier. */
	data: Collection<string, Blacklist>;

	/**
	 * Initializes the AllBlacklist object.
	 *
	 * @param currentPage - The current page number of the paginated results.
	 * @param totalPages - The total number of pages in the result set.
	 * @param totalEntries - The total number of blacklist entries in the result set.
	 * @param data - A collection of blacklist entries (default is an empty collection).
	 */
	constructor({
		currentPage = null,
		totalPages = null,
		totalEntries = 0,
		data = new Collection<string, Blacklist>(),
	}: Partial<AllBlacklist>) {
		this.currentPage = currentPage;
		this.totalPages = totalPages;
		this.totalEntries = totalEntries;
		this.data = data;
	}

	/**
	 * Serializes the AllBlacklist object into a plain JSON object.
	 *
	 * @returns A plain object representation of the AllBlacklist.
	 */
	toJSON() {
		return {
			current_page: this.currentPage,
			total_pages: this.totalPages,
			total_entries: this.totalEntries,
			data: Array.from(this.data.entries()), // Converts the Collection to an array of entries for serialization
		};
	}

	/**
	 * Returns a string representation of the AllBlacklist for debugging purposes.
	 *
	 * @returns A string representation of the AllBlacklist.
	 */
	toString() {
		return `AllBlacklist {
      currentPage: ${this.currentPage},
      totalPages: ${this.totalPages},
      totalEntries: ${this.totalEntries},
      data: Collection(${this.data.size}),
    }`;
	}
}
