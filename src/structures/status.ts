import type { APIStatus, APIStatusInfo, APIStatusServices } from "@quikcess/bet-api-types/v1";
import { assertStatus } from "@/assertions/status";
import type { Betting } from "..";

/**
 * Represents an api status
 */
export class APIServerStatus {
  /** API response time */
  public ping: string;
  /**
   * The status of the api
   *
   * - 'healthy'
   * - 'degraded'
   */
  public status: APIStatus;
  /** Data from external api services */
  public services: APIStatusServices;
  /** For how long the aou is running */
  public uptime?: Date;
  /** For how long the aou is running in millisseconds */
  public uptimeTimestamp?: number;

  /**
   * Represents an api status
   *
   * @constructor
   * @param data - The data from this status
   */
  constructor(data: APIStatusInfo) {
    assertStatus(data);

    const { ping, services, status, uptime } = data;

    this.ping = ping;
    this.status = status;
    this.services = services;
    this.uptime = uptime ? new Date(uptime) : undefined;
    this.uptimeTimestamp = uptime ?? undefined;
  }
}
