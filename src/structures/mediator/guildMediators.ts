import { Collection } from "../collection";
import type { GuildMediator } from "./guildMediator";

/**
 * Class representing a collection of GuildMediators, with pagination and metadata.
 */
export class GuildMediators {
	/** List of guild mediators. */
	public data: Collection<string, GuildMediator>;

	/** The current page number in the paginated data. */
	public currentPage: number;

	/** The total number of pages in the paginated data. */
	public totalPages: number;

	/** The total number of mediators across all pages. */
	public totalMediators: number;

	/**
	 * Constructor to initialize a GuildMediators instance with provided data.
	 *
	 * @param data The data to initialize the GuildMediators.
	 */
	constructor({
		currentPage = 0,
		totalPages = 0,
		totalMediators = 0,
		data = new Collection<string, GuildMediator>(),
	}: Partial<GuildMediators>) {
		this.data = data;
		this.currentPage = currentPage;
		this.totalPages = totalPages;
		this.totalMediators = totalMediators;
	}

	/**
	 * Converts the GuildMediators instance to a plain JSON object.
	 *
	 * @returns The JSON representation of the GuildMediators instance.
	 */
	public toJSON() {
		return {
			data: this.data.map((mediator) => mediator.toJSON()),
			current_page: this.currentPage,
			total_pages: this.totalPages,
			total_mediators: this.totalMediators,
		};
	}
}
