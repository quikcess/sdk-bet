import { Collection } from "@/structures/collection.js";
import type { Scam } from "./base.js";

/**
 * Represents the result of all scam entries, including pagination and a collection of scam data.
 */
export class AllScams {
	/** The current page number of the paginated results, or null if not applicable. */
	currentPage: number | null;

	/** The total number of pages in the result set, or null if not applicable. */
	totalPages: number | null;

	/** The total number of scam entries in the result set. */
	totalEntries: number;

	/** A collection of scam entries, mapped by their string identifier. */
	data: Collection<string, Scam>;

	/**
	 * Initializes the AllScam object.
	 *
	 * @param currentPage - The current page number of the paginated results.
	 * @param totalPages - The total number of pages in the result set.
	 * @param totalEntries - The total number of scam entries in the result set.
	 * @param data - A collection of scam entries (default is an empty collection).
	 */
	constructor({
		currentPage = null,
		totalPages = null,
		totalEntries = 0,
		data = new Collection<string, Scam>(),
	}: Partial<AllScams>) {
		this.currentPage = currentPage;
		this.totalPages = totalPages;
		this.totalEntries = totalEntries;
		this.data = data;
	}

	/**
	 * Serializes the AllScams object into a plain JSON object.
	 *
	 * @returns A plain object representation of the AllScams.
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
	 * Returns a string representation of the AllScams for debugging purposes.
	 *
	 * @returns A string representation of the AllScams.
	 */
	toString() {
		return `AllScams {
      currentPage: ${this.currentPage},
      totalPages: ${this.totalPages},
      totalEntries: ${this.totalEntries},
      data: Collection(${this.data.size}),
    }`;
	}
}
