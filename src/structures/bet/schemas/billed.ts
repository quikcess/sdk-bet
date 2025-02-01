import type {
	APIBetBilled,
	APIBetBilledRooms,
} from "@quikcess/bet-api-types/v1";

/**
 * Represents the billing information for rooms, including total sold, revenue, expenses, and profit.
 */
export class BetBilledRooms {
	/** Total number of rooms sold. */
	public readonly sold: number;

	/** Total revenue generated from selling rooms, based on room_price (from the bet schema). */
	public readonly revenue: number;

	/** Total expenses incurred to purchase the rooms, based on room_price (from the bet schema). */
	public readonly expenses: number;

	/** Net profit calculated as revenue minus expenses, based on room_price (from the bet schema). */
	public readonly profit: number;

	/**
	 * Initializes a BetBilledRooms instance with API data.
	 * Ensures all room billing metrics are mapped correctly from the API response.
	 *
	 * @param data - The raw API data containing room billing metrics.
	 */
	constructor(data: APIBetBilledRooms) {
		this.sold = data.sold;
		this.revenue = data.revenue;
		this.expenses = data.expenses;
		this.profit = data.profit;
	}
}

/**
 * Represents the overall billed information for bets, including total profit, fee-only profit, and room-related data.
 */
export class BetBilled {
	/** Total profit (fee_only + rooms.profit). */
	public readonly profit: number;

	/** Total billed without rooms, only with the imposed fee. */
	public readonly feeOnly: number;

	/** Total revenue (fee_only + rooms.revenue). */
	public readonly revenue: number;

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
		this.revenue = data.revenue;
		this.rooms = new BetBilledRooms(data.rooms);
	}
}
