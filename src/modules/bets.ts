import { Collection } from "@/structures/collection";
import type { Betting } from "..";
import { assertString } from "@/assertions/literal";
import { BetStructure } from "@/structures/bet";
import { Routes } from "@/lib/routes";

export class BetModule {
  constructor(private readonly client: Betting) {}

  /**
   * If the ID is provided, it will return an application that you can manage or get information
   * If the ID is not provided, it will return a collection of applications
   *
   * @param applicationId - The application ID, you must own the application
   */
  async get(): Promise<Collection<string, BetStructure>>;
  async get(guildId: string): Promise<Collection<string, BetStructure>>;
  async get(guildId: string, page: number, limit: number): Promise<Collection<string, BetStructure>>;
  async get(guildId?: string, page?: number, limit?: number): Promise<Collection<string, BetStructure>> {
    if (guildId) {
      assertString(guildId);
      const { response } = await this.client.api.request(Routes.bets.get(guildId), { query: { page, limit } });
      return new Collection(response.data.map((data) => [data.betId, new BetStructure(data)]));
    }

    const { response } = await this.client.api.request(Routes.bets.get(), { query: { page, limit } });
    return new Collection(response.data.map((data) => [data.betId, new BetStructure(data)]));
  }
}
