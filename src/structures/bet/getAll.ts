import { Collection } from "#quikcess/structures/collection";
import type { GuildBet } from "./base";

/**
 * Represents the result of all bets, including pagination and a collection of bet data.
 */
export class GuildAllBets {
	/** The current page number of the paginated results, or null if not applicable. */
	public readonly currentPage: number | null;

	/** The total number of pages in the result set, or null if not applicable. */
	public readonly totalPages: number | null;

	/** The total number of bets in the result set. */
	public readonly totalBets: number;

	/** A collection of bets, mapped by their string identifier. */
	public readonly data: Collection<string, GuildBet>;

	/**
	 * Initializes the GuildAllBets object.
	 *
	 * @param currentPage - The current page number of the paginated results.
	 * @param totalPages - The total number of pages in the result set.
	 * @param totalBets - The total number of bets in the result set.
	 * @param data - A collection of bets (default is an empty collection).
	 */
	constructor({
		currentPage = null,
		totalPages = null,
		totalBets = 0,
		data = new Collection<string, GuildBet>(),
	}: Partial<GuildAllBets>) {
		this.currentPage = currentPage;
		this.totalPages = totalPages;
		this.totalBets = totalBets;
		this.data = data;
	}

	/**
	 * Serializes the GuildAllBets object into a plain JSON object.
	 *
	 * @returns A plain object representation of the GuildAllBets.
	 */
	public toJSON() {
		return {
			current_page: this.currentPage,
			total_pages: this.totalPages,
			total_bets: this.totalBets,
			data: Array.from(this.data.entries()), // Converts the Collection to an array of entries for serialization
		};
	}

	/**
	 * Returns a string representation of the GuildAllBets for debugging purposes.
	 *
	 * @returns A string representation of the GuildAllBets.
	 */
	public toString() {
		return `GuildAllBets {
			currentPage: ${this.currentPage},
			totalPages: ${this.totalPages},
			totalBets: ${this.totalBets},
			data: Collection(${this.data.size}),
		}`;
	}
}
