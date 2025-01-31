import type { APIMediators } from "@quikcess/bet-api-types/v1";
import { Mediator } from "./globalMediator";

/**
 * Class representing a collection of mediators with pagination and total counts.
 */
export class Mediators {
	/** The list of mediators in the current page. */
	public data: Mediator[];

	/** The current page number. */
	public currentPage: number;

	/** The total number of pages. */
	public totalPages: number;

	/** The total number of mediators across all pages. */
	public totalMediators: number;

	/** Constructor that initializes the Mediators instance with the provided data. */
	constructor(data: APIMediators) {
		this.data = data.data.map((mediator) => new Mediator(mediator));
		this.currentPage = data.current_page;
		this.totalPages = data.total_pages;
		this.totalMediators = data.total_mediators;
	}

	/** Converts the Mediators instance to a plain JSON object. */
	public toJSON() {
		return {
			data: this.data.map((mediator) => mediator.toJSON()),
			current_page: this.currentPage,
			total_pages: this.totalPages,
			total_mediators: this.totalMediators,
		};
	}
}
