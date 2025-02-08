import { assertGuildMods } from "#quikcess/assertions";
import { Collection } from "#quikcess/structures/collection";
import type { GuildMod } from "./mod";

/**
 * Represents a collection of mods, including pagination details and a collection of guild mod data.
 */
export class GuildMods {
	/** The current page number in a paginated result set, or null if pagination is not used. */
	public readonly currentPage: number;

	/** The total number of pages in the result set, or null if pagination is not used. */
	public readonly totalPages: number;

	/** The total number of mods available in the result set. */
	public readonly totalMods: number;

	/** A collection of mods, mapped by their unique string identifier. */
	public readonly data: Collection<string, GuildMod>;

	/**
	 * Creates a new instance of the GuildMods class.
	 *
	 * @param currentPage - The current page number in the paginated results (default: 0).
	 * @param totalPages - The total number of pages in the result set (default: 0).
	 * @param totalMods - The total number of mods available (default: 0).
	 * @param data - A collection of mods (default: an empty collection).
	 */
	constructor({
		currentPage = 0,
		totalPages = 0,
		totalMods = 0,
		data = new Collection<string, GuildMod>(),
	}: Partial<GuildMods>) {
		assertGuildMods(data.toJSON().map((entry) => entry.toJSON()));

		this.currentPage = currentPage;
		this.totalPages = totalPages;
		this.totalMods = totalMods;
		this.data = data;
	}

	/**
	 * Converts the GuildMods object into a plain JSON-serializable object.
	 *
	 * @returns A plain object representation of the GuildMods instance.
	 */
	toJSON() {
		return {
			current_page: this.currentPage,
			total_pages: this.totalPages,
			totalMods: this.totalMods,
			data: this.data.toJSON().map((entry) => entry.toJSON()),
		};
	}

	/**
	 * Returns a string representation of the GuildMods instance for debugging purposes.
	 *
	 * @returns A formatted string describing the GuildMods instance.
	 */
	toString() {
		return `Mods {
      currentPage: ${this.currentPage},
      totalPages: ${this.totalPages},
      totalMods: ${this.totalMods},
      data: Collection(${this.data.size}),
    }`;
	}
}
