import { assertScams } from "#quikcess/assertions";
import { Collection } from "#quikcess/structures/collection";
import type { Scam } from "./scam";

/**
 * Represents the result of all scam entries, including pagination and a collection of scam data.
 */
export class Scams {
	/** The current page number of the paginated results, or null if not applicable. */
	public readonly currentPage: number | null;

	/** The total number of pages in the result set, or null if not applicable. */
	public readonly totalPages: number | null;

	/** The total number of scam entries in the result set. */
	public readonly totalEntries: number;

	/** A collection of scam entries, mapped by their string identifier. */
	public readonly data: Collection<string, Scam>;

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
	}: Partial<Scams>) {
		assertScams(data.values().toArray());

		this.currentPage = currentPage;
		this.totalPages = totalPages;
		this.totalEntries = totalEntries;
		this.data = data;
	}

	/**
	 * Serializes the Scams object into a plain JSON object.
	 *
	 * @returns A plain object representation of the Scams.
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
	 * Returns a string representation of the Scams for debugging purposes.
	 *
	 * @returns A string representation of the Scams.
	 */
	toString() {
		return `Scams {
      currentPage: ${this.currentPage},
      totalPages: ${this.totalPages},
      totalEntries: ${this.totalEntries},
      data: Collection(${this.data.size}),
    }`;
	}
}
