import type {
	APIStatus,
	APIStatusServices,
	APIStatusType,
} from "@quikcess/bet-api-types/v1";
import { assertStatus } from "#quikcess/assertions/status";

/**
 * Represents an api status
 */
export class Status {
	/** API response time */
	public readonly ping: number;

	/**
	 * The status of the api
	 *
	 * - 'healthy'
	 * - 'degraded'
	 * - 'unknown'
	 */
	public readonly status: APIStatusType;

	/** Data from external api services */
	public readonly services: APIStatusServices;

	/** For how long the aou is running */
	public readonly uptime?: Date;

	/** For how long the aou is running in millisseconds */
	public readonly uptimeTimestamp?: number;

	/**
	 * Represents an api status
	 *
	 * @constructor
	 * @param data - The data from this status
	 */
	constructor(data: APIStatus) {
		assertStatus(data);

		const { ping, services, status, uptime } = data;

		this.ping = ping;
		this.status = status;
		this.services = services;
		this.uptime = uptime ? new Date(uptime) : undefined;
		this.uptimeTimestamp = uptime ?? undefined;
	}
}
