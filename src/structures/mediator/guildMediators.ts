import type { APIGuildMediators } from "@quikcess/bet-api-types/v1";
import { GuildMediator } from "./guildMediator";

/**
 * Class representing a collection of GuildMediators, with pagination and metadata.
 */
export class GuildMediators {
	/** List of guild mediators. */
	public data: GuildMediator[];

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
	constructor(data: APIGuildMediators) {
		this.data = data.data.map((mediator) => new GuildMediator(mediator));
		this.currentPage = data.current_page;
		this.totalPages = data.total_pages;
		this.totalMediators = data.total_mediators;
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
