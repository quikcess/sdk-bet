import type { RESTGetAPIGuildBetsQuery } from "@quikcess/bet-api-types/v1";
import { assertGuildBet } from "#quikcess/assertions";
import { assertString } from "#quikcess/assertions/literal";
import type { Betting } from "#quikcess/index";
import { Routes } from "#quikcess/lib/routes";
import { Cache } from "#quikcess/services";
import { GuildAllBets, GuildBet } from "#quikcess/structures";
import { BetStats } from "#quikcess/structures/bet/stats/global";
import { Collection } from "#quikcess/structures/collection";
import type { BetCreateData } from "#quikcess/types";
import { toSnakeCase } from "#quikcess/utils/cases";

export class BetManager {
	public readonly cache: Cache<GuildBet>;

	constructor(public readonly client: Betting) {
		this.cache = new Cache();
	}

	// ex.: client.bets.fetch("123") -> acesso sem guildId
	async fetch(betId: string): Promise<GuildBet> {
		assertString(betId, "BET_ID");

		const { response } = await this.client.api.request(Routes.bets.get(betId));

		const bet = new GuildBet(response);
		this.cache.set(bet.betId, bet);
		return bet;
	}

	async fetchAll(playerIds?: string[]): Promise<GuildAllBets> {
		const query: RESTGetAPIGuildBetsQuery = { player_ids: playerIds ?? [] };

		const { response } = await this.client.api.request(Routes.bets.getAll(), {
			query,
		});

		const transformedData = new Collection(
			response.data.map((data) => [data.bet_id, new GuildBet(data)]),
		);

		return new GuildAllBets({
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

	async create(data: BetCreateData): Promise<GuildBet> {
		const payload = toSnakeCase(data);
		assertGuildBet(payload, "/bets/create");

		const { response } = await this.client.api.request(
			Routes.guilds.bets.create(data.guildId),
			{
				method: "POST",
				body: payload,
			},
		);

		const bet = new GuildBet(response);
		this.cache.set(bet.betId, bet);
		return bet;
	}
}
