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
import type { Betting, LocalCache } from "#quikcess/index";
import { Routes } from "#quikcess/lib/routes";
import { Cache } from "#quikcess/services";
import { GuildBet, GuildBets } from "#quikcess/structures";
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
		this.cache = new Cache<GuildBet>();
	}

	async get(betId: string): Promise<GuildBet> {
		assertString(betId, "BET_ID");

		const cached = this.cache.get(betId);
		if (cached) {
			return cached;
		}

		const { response } = await this.client.api.request(
			Routes.guilds.bets.get(this.guildId, betId),
		);

		const data = new GuildBet(response);
		this.cache.set(data.betId, data);

		return data;
	}

	async fetch(betId: string): Promise<GuildBet> {
		assertString(betId, "BET_ID");

		const { response } = await this.client.api.request(
			Routes.guilds.bets.get(this.guildId, betId),
		);

		const data = new GuildBet(response);
		this.cache.set(data.betId, data);

		return data;
	}

	async getByChannelId(channelId: string): Promise<GuildBet> {
		assertString(channelId, "CHANNEL_ID");

		const { response } = await this.client.api.request(
			Routes.guilds.bets.getByChannelId(this.guildId, channelId),
		);

		const data = new GuildBet(response);
		this.cache.set(data.betId, data);

		return data;
	}

	async getAll(playerIds?: string[]): Promise<GuildBets> {
		const query: RESTGetAPIGuildBetsQuery = { player_ids: playerIds ?? [] };

		const { response } = await this.client.api.request(
			Routes.guilds.bets.getAll(this.guildId),
			{
				query,
			},
		);

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

	async getCount(): Promise<number> {
		const { response } = await this.client.api.request(
			Routes.guilds.bets.getCount(this.guildId),
		);

		return response;
	}

	async getStats(): Promise<GuildBetStats> {
		const { response } = await this.client.api.request(
			Routes.guilds.bets.getStats(this.guildId),
		);

		return new GuildBetStats(response);
	}

	async create(data: BetCreateData): Promise<GuildBet> {
		const payload = toSnakeCase(data);
		assertGuildBet(payload, "/guilds/bets/create");

		const { response } = await this.client.api.request(
			Routes.guilds.bets.create(data.guildId),
			{
				method: "POST",
				body: payload,
			},
		);

		const dataCreated = new GuildBet(response);
		this.cache.set(dataCreated.betId, dataCreated);

		return dataCreated;
	}

	async update(betId: string, data: BetUpdateData): Promise<GuildBet> {
		assertString(betId);

		const payload = toSnakeCase(data);
		assertPartialGuildBet(payload, "/bets/update");

		const { response } = await this.client.api.request(
			Routes.guilds.bets.update(this.guildId, betId),
			{
				method: "PATCH",
				body: payload,
			},
		);

		const dataUpdated = new GuildBet(response);
		this.cache.set(dataUpdated.betId, dataUpdated);

		return dataUpdated;
	}

	async delete(betId: string): Promise<GuildBet> {
		assertString(betId);

		const { response } = await this.client.api.request(
			Routes.guilds.bets.delete(this.guildId, betId),
			{ method: "DELETE" },
		);

		this.cache.delete(betId);

		return new GuildBet(response);
	}

	async bulkCreate(data: BetCreateData[]): Promise<GuildBet[]> {
		const MAX_BATCH_SIZE = 25;
		const results: GuildBet[] = [];

		const payload: APIGuildBet[] = toSnakeCase(data);
		assertGuildBets(payload, "/bets/bulk/create");

		for (let i = 0; i < payload.length; i += MAX_BATCH_SIZE) {
			const batch = payload.slice(i, i + MAX_BATCH_SIZE);

			const { response } = await this.client.api.request(
				Routes.guilds.bets.bulk.create(this.guildId),
				{
					method: "POST",
					body: batch,
				},
			);

			results.push(
				...response.map((bet) => {
					const dataCreated = new GuildBet(bet);
					this.cache.set(dataCreated.betId, dataCreated);
					return dataCreated;
				}),
			);
		}

		return results;
	}

	async bulkDelete(betIds: string[]): Promise<GuildBet[]> {
		const MAX_BATCH_SIZE = 75;
		const results: GuildBet[] = [];

		for (let i = 0; i < betIds.length; i += MAX_BATCH_SIZE) {
			const batch = betIds.slice(i, i + MAX_BATCH_SIZE);

			const { response } = await this.client.api.request(
				Routes.guilds.bets.bulk.delete(this.guildId),
				{
					method: "DELETE",
					body: batch,
				},
			);

			results.push(
				...response.map((bet) => {
					const dataDeleted = new GuildBet(bet);
					this.cache.delete(dataDeleted.betId);
					return dataDeleted;
				}),
			);
		}

		return results;
	}

	async getThreadWaitTime(): Promise<number> {
		const { response } = await this.client.api.request(
			Routes.guilds.bets.getThreadWaitTime(this.guildId),
		);
		return response;
	}
}
