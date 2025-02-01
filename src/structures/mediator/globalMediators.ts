import { Collection } from "../collection";
import type { Mediator } from "./globalMediator";

/**
 * Class representing a collection of Mediators, with pagination and metadata.
 */
export class Mediators {
	/** List of mediators. */
	public data: Collection<string, Mediator>;

	/** The current page number in the paginated data. */
	public currentPage: number;

	/** The total number of pages in the paginated data. */
	public totalPages: number;

	/** The total number of mediators across all pages. */
	public totalMediators: number;

	/**
	 * Constructor to initialize a Mediators instance with provided data.
	 *
	 * @param data The data to initialize the Mediators.
	 */
	constructor({
		currentPage = 0,
		totalPages = 0,
		totalMediators = 0,
		data = new Collection<string, Mediator>(),
	}: Partial<Mediators>) {
		this.data = data;
		this.currentPage = currentPage;
		this.totalPages = totalPages;
		this.totalMediators = totalMediators;
	}

	/**
	 * Converts the Mediators instance to a plain JSON object.
	 *
	 * @returns The JSON representation of the Mediators instance.
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
