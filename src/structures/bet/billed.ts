import type {
	APIBetBilled,
	APIBetBilledRooms,
} from "@quikcess/bet-api-types/v1";

/**
 * Represents the billing information for bets, including total profit, fee, and room-related metrics.
 */
export class BetBilledRooms {
	/** Total number of rooms sold. */
	public readonly sold: number;

	/** Total revenue generated from selling rooms. */
	public readonly revenue: number;

	/** Total cost incurred to purchase the rooms. */
	public readonly expenses: number;

	/** Net profit calculated as invoicing minus investment. */
	public readonly profit: number;

	/**
	 * Initializes a BetBilledRooms instance with API data.
	 * Ensures all room billing metrics are mapped correctly from the API response.
	 *
	 * @param data - The raw API data containing room billing metrics.
	 */
	constructor(data: APIBetBilledRooms) {
		this.sold = data.sold;
		this.profit = data.profit;
		this.expenses = data.expenses;
		this.revenue = data.revenue;
	}
}

/**
 * Represents the overall billed information for bets, including total profit, fee-only profit, and room-based data.
 */
export class BetBilled {
	/** Total invoiced amount (fee + room sales). */
	public readonly profit: number;

	/** Total billed without rooms, only with the imposed fee. */
	public readonly feeOnly: number;

	/** Billing information related to room sales. */
	public readonly rooms: BetBilledRooms;

	/**
	 * Initializes a BetBilled instance with API data.
	 * Ensures all billing metrics are mapped correctly from the API response.
	 *
	 * @param data - The raw API data containing the billed information.
	 */
	constructor(data: APIBetBilled) {
		this.profit = data.profit;
		this.feeOnly = data.fee_only;
		this.rooms = new BetBilledRooms(data.rooms);
	}
}
