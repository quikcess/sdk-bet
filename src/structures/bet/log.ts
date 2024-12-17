import type { APIBetLog } from "@quikcess/bet-api-types/v1";

export class BetLog {
  public readonly closedUrl: string;
  public readonly createdUrl: string;
  public readonly startedUrl: string;
  public readonly victoryUrl: string;

  constructor(data: APIBetLog) {
    this.closedUrl = data.closed_url;
    this.createdUrl = data.created_url;
    this.startedUrl = data.started_url;
    this.victoryUrl = data.victory_url;
  }
}