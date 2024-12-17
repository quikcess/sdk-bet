import type { APIBetPlayer } from "@quikcess/bet-api-types/v1";

export class BetPlayer {
  public readonly userId: string;
  public readonly wins: number;
  public readonly loses: number;
  public readonly consecutives: number;

  constructor(data: APIBetPlayer) {
    this.userId = data.user_id;
    this.wins = data.wins;
    this.loses = data.loses;
    this.consecutives = data.consecutives;
  }
}