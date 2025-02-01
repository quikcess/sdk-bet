import type { RESTGetAPIGuildBetsQuery } from "@quikcess/bet-api-types/v1";
import { assertString } from "#quikcess/assertions/literal";
import type { Betting } from "#quikcess/index";
import { Routes } from "#quikcess/lib/routes";
import { Cache } from "#quikcess/services";
import { GuildBet, GuildBets } from "#quikcess/structures";
import { BetStats } from "#quikcess/structures/bet/stats/global";
import { Collection } from "#quikcess/structures/collection";

export class BetManager {
	public readonly cache: Cache<GuildBet>;

	constructor(public readonly client: Betting) {
		this.cache = new Cache();
	}

	async fetch(
		betId: string,
		options?: {
			cache?: boolean;
		},
	): Promise<GuildBet> {
		assertString(betId, "BET_ID");
		const { cache = false } = options || {};

		if (cache) {
			const cached = this.cache.get(betId);
			if (cached) {
				return cached;
			}
		}

		const { response } = await this.client.api.request(Routes.bets.get(betId));

		const data = new GuildBet(response);
		this.cache.set(data.betId, data);

		return data;
	}

	async fetchAll(playerIds?: string[]): Promise<GuildBets> {
		const query: RESTGetAPIGuildBetsQuery = { player_ids: playerIds ?? [] };

		const { response } = await this.client.api.request(Routes.bets.getAll(), {
			query,
		});

		const transformedData = new Collection(
			response.data.map((data) => [data.bet_id, new GuildBet(data)]),
		);

		for (const data of transformedData.values()) {
			this.cache.set(data.betId, data);
		}

		return new GuildBets({
			currentPage: response.current_page,
			totalPages: response.total_pages,
			totalBets: response.total_bets,
			data: transformedData,
		});
	}

	async fetchCount(): Promise<number> {
		const { response } = await this.client.api.request(Routes.bets.getCount());
		return response;
	}

	async fetchStats(): Promise<BetStats> {
		const { response } = await this.client.api.request(Routes.bets.getStats());
		return new BetStats(response);
	}
}
