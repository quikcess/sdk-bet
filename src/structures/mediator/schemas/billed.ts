import type {
	APIMediatorBilled,
	APIMediatorBilledRooms,
} from "@quikcess/bet-api-types/v1";

// Class representing the billed data for rooms handled by a mediator
export class MediatorBilledRooms {
	/** The number of rooms sold. */
	public sold: number;

	/** The revenue generated from the rooms. */
	public revenue: number;

	/** The expenses incurred for the rooms. */
	public expenses: number;

	/** The profit made from the rooms. */
	public profit: number;

	/** Constructor that initializes the MediatorBilledRooms instance with the provided data. */
	constructor(data: APIMediatorBilledRooms) {
		this.sold = data.sold;
		this.revenue = data.revenue;
		this.expenses = data.expenses;
		this.profit = data.profit;
	}

	/** Converts the MediatorBilledRooms instance to a plain JSON object. */
	public toJSON() {
		return {
			sold: this.sold,
			revenue: this.revenue,
			expenses: this.expenses,
			profit: this.profit,
		};
	}
}

// Class representing the billed data for a mediator, including revenue, fees, and rooms information
export class MediatorBilled {
	/** The total profit from the mediator's activities. */
	public profit: number;

	/** The fee amount applied to the mediator's revenue. */
	public feeOnly: number;

	/** The total revenue generated by the mediator. */
	public revenue: number;

	/** The associated rooms data for the billed mediator. */
	public rooms: MediatorBilledRooms;

	/** Constructor that initializes the MediatorBilled instance with the provided data. */
	constructor(data: APIMediatorBilled) {
		this.profit = data.profit;
		this.feeOnly = data.fee_only;
		this.revenue = data.revenue;
		this.rooms = new MediatorBilledRooms(data.rooms);
	}

	/** Converts the MediatorBilled instance to a plain JSON object. */
	public toJSON() {
		return {
			profit: this.profit,
			fee_only: this.feeOnly,
			revenue: this.revenue,
			rooms: this.rooms.toJSON(),
		};
	}
}
