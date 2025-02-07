import { assertGuildQueues } from "#quikcess/assertions";
import { Collection } from "#quikcess/structures/collection";
import type { GuildQueue } from "./queue";

/**
 * Represents a collection of queues, including pagination details and a collection of guild queue data.
 */
export class GuildQueues {
	/** The current page number in a paginated result set, or null if pagination is not used. */
	public readonly currentPage: number;

	/** The total number of pages in the result set, or null if pagination is not used. */
	public readonly totalPages: number;

	/** The total number of queues available in the result set. */
	public readonly totalQueues: number;

	/** A collection of queues, mapped by their unique string identifier. */
	public readonly data: Collection<string, GuildQueue>;

	/**
	 * Creates a new instance of the Queues class.
	 *
	 * @param currentPage - The current page number in the paginated results (default: 0).
	 * @param totalPages - The total number of pages in the result set (default: 0).
	 * @param totalQueues - The total number of queues available (default: 0).
	 * @param data - A collection of queues (default: an empty collection).
	 */
	constructor({
		currentPage = 0,
		totalPages = 0,
		totalQueues = 0,
		data = new Collection<string, GuildQueue>(),
	}: Partial<GuildQueues>) {
		assertGuildQueues(data.toJSON().map((entry) => entry.toJSON()));

		this.currentPage = currentPage;
		this.totalPages = totalPages;
		this.totalQueues = totalQueues;
		this.data = data;
	}

	/**
	 * Converts the Queues object into a plain JSON-serializable object.
	 *
	 * @returns A plain object representation of the Queues instance.
	 */
	toJSON() {
		return {
			current_page: this.currentPage,
			total_pages: this.totalPages,
			total_queues: this.totalQueues,
			data: this.data.toJSON().map((entry) => entry.toJSON()),
		};
	}

	/**
	 * Returns a string representation of the Queues instance for debugging purposes.
	 *
	 * @returns A formatted string describing the Queues instance.
	 */
	toString() {
		return `Queues {
      currentPage: ${this.currentPage},
      totalPages: ${this.totalPages},
      totalQueues: ${this.totalQueues},
      data: Collection(${this.data.size}),
    }`;
	}
}
