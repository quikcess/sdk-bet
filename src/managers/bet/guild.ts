import type {
	APIGuildBet,
	RESTGetAPIGuildBetsQuery,
} from "@quikcess/bet-api-types/v1";
import {
	assertGuildBet,
	assertGuildBets,
	assertPartialGuildBet,
} from "#quikcess/assertions";
import { assertString } from "#quikcess/assertions/literal";
import type { Betting } from "#quikcess/index";
import { Routes } from "#quikcess/lib/routes";
import { Cache } from "#quikcess/services";
import { GuildAllBets, GuildBet } from "#quikcess/structures";
import { GuildBetStats } from "#quikcess/structures/bet/stats/guild";
import { Collection } from "#quikcess/structures/collection";
import type { BetCreateData, BetUpdateData } from "#quikcess/types";
import { toSnakeCase } from "#quikcess/utils/cases";

export class GuildBetManager {
	public readonly cache: Cache<GuildBet>;

	constructor(
		public readonly client: Betting,
		public readonly guildId: string,
	) {
		assertString(guildId, "GUILD_ID");
		this.cache = new Cache();
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

	async getByChannelId(guildId: string, channelId: string): Promise<GuildBet> {
		assertString(guildId, "GUILD_ID");
		assertString(channelId, "CHANNEL_ID");

		const { response } = await this.client.api.request(
			Routes.guilds.bets.getByChannelId(guildId, channelId),
		);
		return new GuildBet(response);
	}

	// ex.: guild.bets.fetch("123") -> acesso com o guildId
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

		const { response } = await this.client.api.request(
			Routes.guilds.bets.get(this.guildId, betId),
		);

		const bet = new GuildBet(response);
		this.cache.set(bet.betId, bet);
		return bet;
	}

	async getAll(guildId: string, playerIds?: string[]): Promise<GuildAllBets> {
		assertString(guildId, "GUILD_ID");

		const query: RESTGetAPIGuildBetsQuery = { player_ids: playerIds ?? [] };

		const { response } = await this.client.api.request(
			Routes.guilds.bets.getAll(guildId),
			{
				query,
			},
		);

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

	async update(
		guildId: string,
		betId: string,
		data: BetUpdateData,
	): Promise<GuildBet> {
		assertString(guildId);
		assertString(betId);

		const payload = toSnakeCase(data);
		assertPartialGuildBet(payload, "/bets/update");

		const { response } = await this.client.api.request(
			Routes.guilds.bets.update(guildId, betId),
			{
				method: "PATCH",
				body: payload,
			},
		);

		return new GuildBet(response);
	}

	async getCount(guildId: string): Promise<number> {
		assertString(guildId);

		const { response } = await this.client.api.request(
			Routes.guilds.bets.getCount(guildId),
		);

		return response;
	}

	async getStats(guildId: string): Promise<GuildBetStats> {
		assertString(guildId);

		const { response } = await this.client.api.request(
			Routes.guilds.bets.getStats(guildId),
		);

		return new GuildBetStats(response);
	}

	async bulkCreate(
		guildId: string,
		data: BetCreateData[],
	): Promise<GuildBet[]> {
		assertString(guildId);

		const MAX_BATCH_SIZE = 25;
		const results: GuildBet[] = [];

		const payload: APIGuildBet[] = toSnakeCase(data);
		assertGuildBets(payload, "/bets/bulk/create");

		for (let i = 0; i < payload.length; i += MAX_BATCH_SIZE) {
			const batch = payload.slice(i, i + MAX_BATCH_SIZE);

			const { response } = await this.client.api.request(
				Routes.guilds.bets.bulk.create(guildId),
				{
					method: "POST",
					body: batch,
				},
			);

			results.push(...response.map((bet) => new GuildBet(bet)));
		}

		return results;
	}

	async bulkDelete(guildId: string, betIds: string[]): Promise<GuildBet[]> {
		assertString(guildId);

		const MAX_BATCH_SIZE = 75;
		const results: GuildBet[] = [];

		for (let i = 0; i < betIds.length; i += MAX_BATCH_SIZE) {
			const batch = betIds.slice(i, i + MAX_BATCH_SIZE);

			const { response } = await this.client.api.request(
				Routes.guilds.bets.bulk.delete(guildId),
				{
					method: "DELETE",
					body: batch,
				},
			);

			results.push(...response.map((bet) => new GuildBet(bet)));
		}

		return results;
	}

	async getThreadWaitTime(guildId: string): Promise<number> {
		assertString(guildId);
		const { response } = await this.client.api.request(
			Routes.guilds.bets.getThreadWaitTime(guildId),
		);
		return response;
	}
}
