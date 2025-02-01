import type {
	APIUserBilled,
	APIUserBilledRooms,
} from "@quikcess/bet-api-types/v1";

/**
 * Represents the rooms billed for the user.
 */
export class UserBilledRooms {
	/** Total rooms purchased by the user. */
	public purchased: number;

	/** Total expenses for the rooms based on room price. */
	public expenses: number;

	constructor(data: APIUserBilledRooms) {
		this.purchased = data.purchased;
		this.expenses = data.expenses;
	}

	/**
	 * Converts the APIUserBilledRooms instance to a plain JSON object.
	 */
	public toJSON() {
		return {
			purchased: this.purchased,
			expenses: this.expenses,
		};
	}
}

/**
 * Represents the billed information for a user.
 */
export class UserBilled {
	/** Profit based on fee only and room expenses. */
	public profit: number;

	/** Total invoiced amount (fee only). */
	public fee_only: number;

	/** Information about the rooms billed for the user. */
	public rooms: UserBilledRooms;

	constructor(data: APIUserBilled) {
		this.profit = data.profit;
		this.fee_only = data.fee_only;
		this.rooms = new UserBilledRooms(data.rooms || {});
	}

	/**
	 * Converts the APIUserBilled instance to a plain JSON object.
	 */
	public toJSON() {
		return {
			profit: this.profit,
			fee_only: this.fee_only,
			rooms: this.rooms.toJSON(),
		};
	}
}
