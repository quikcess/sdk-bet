import { Collection } from "@/structures/collection";
import type {  Betting } from "..";
import { assertString } from "@/assertions/literal";
import { Routes } from "@/lib/routes";
import { BetStructure } from "@/structures/bet/base";
import { AllBetsResult } from "@/structures/bet/getAll";
import type { RESTGetAPIBetsPaginationQuery} from "@quikcess/bet-api-types/v1";

export class BetModule {
  constructor(private readonly client: Betting) {}

  async getById(betId: string): Promise<BetStructure> {
    assertString(betId);
    
    const { response } = await this.client.api.request(Routes.bets.getById(betId));
    return new BetStructure(response)
  }

  async getByChannelId(channelId: string): Promise<BetStructure> {
    assertString(channelId);
    
    const { response } = await this.client.api.request(Routes.bets.getByChannelId(channelId));
    return new BetStructure(response)
  }

  async getAll(guildId?:string, options?: RESTGetAPIBetsPaginationQuery): Promise<AllBetsResult> {
    if (guildId) assertString(guildId);
    
    const { response } = await this.client.api.request(Routes.bets.getAll(), { query: options || {} });

    const transformedData = new Collection(
      response.data.map((data) => [data.betId, new BetStructure(data)]),
    );

    return new AllBetsResult({
      currentPage: response.currentPage,
      totalPages: response.totalPages,
      totalBets: response.totalBets,
      data: transformedData,
    })
  }
}
