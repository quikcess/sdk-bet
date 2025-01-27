import { assertBet, assertBets, assertPartialBet } from "@/assertions/bet";
import { assertArrayOfStrings, assertString } from "@/assertions/literal";
import { Routes } from "@/lib/routes";
import { GuildBet } from "@/structures/bet/base";
import { GuildAllBets } from "@/structures/bet/getAll";
import { BetStats } from "@/structures/bet/stats";
import { Collection } from "@/structures/collection";
import { toSnakeCase } from "@/utils/cases/index";
import type {
	APIBet,
	RESTGetAPIAllBetsQuery,
} from "@quikcess/bet-api-types/v1";
import type { BetCreateData, BetUpdateData, Betting } from "../index";

export class BetModule {
	constructor(private readonly client: Betting) {}

	async get(guildId: string, betId: string): Promise<GuildBet> {
		assertString(guildId, "GUILD_ID");
		assertString(betId, "BET_ID");

		const { response } = await this.client.api.request(
			Routes.guilds.bets.get(guildId, betId),
		);
		return new GuildBet(response);
	}

	async fetch(betId: string): Promise<GuildBet> {
		assertString(betId, "BET_ID");

		const { response } = await this.client.api.request(
			Routes.bets.fetch(betId),
		);
		return new GuildBet(response);
	}

	async getByChannelId(guildId: string, channelId: string): Promise<GuildBet> {
		assertString(guildId, "GUILD_ID");
		assertString(channelId, "CHANNEL_ID");

		const { response } = await this.client.api.request(
			Routes.guilds.bets.getByChannelId(guildId, channelId),
		);
		return new GuildBet(response);
	}

	async getChannelIdByPlayerIds(
		guildId: string,
		playerIds: string[],
	): Promise<Record<string, string[]>> {
		assertString(guildId, "GUILD_ID");
		assertArrayOfStrings(playerIds, "PLAYER_IDS");

		const { response } = await this.client.api.request(
			Routes.guilds.bets.getChannelIdsFromPlayerId(guildId),
			{
				query: {
					player_ids: playerIds,
				},
			},
		);

		return response;
	}

	async getAll(guildId: string, playerIds?: string[]): Promise<GuildAllBets> {
		assertString(guildId, "GUILD_ID");

		const query: RESTGetAPIAllBetsQuery = { player_ids: playerIds ?? [] };

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

	async fetchAll(playerIds?: string[]): Promise<GuildAllBets> {
		const query: RESTGetAPIAllBetsQuery = { player_ids: playerIds ?? [] };

		const { response } = await this.client.api.request(Routes.bets.fetchAll(), {
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

	async create(data: BetCreateData): Promise<GuildBet> {
		const payload = toSnakeCase(data);
		assertBet(payload, "/bets/create");

		const { response } = await this.client.api.request(
			Routes.guilds.bets.create(data.guildId),
			{
				method: "POST",
				body: payload,
			},
		);

		return new GuildBet(response);
	}

	async update(
		guildId: string,
		betId: string,
		data: BetUpdateData,
	): Promise<GuildBet> {
		assertString(guildId);
		assertString(betId);

		const payload = toSnakeCase(data);
		assertPartialBet(payload, "/bets/update");

		const { response } = await this.client.api.request(
			Routes.guilds.bets.update(guildId, betId),
			{
				method: "PATCH",
				body: payload,
			},
		);

		return new GuildBet(response);
	}

	async delete(guildId: string, betId: string): Promise<GuildBet> {
		assertString(guildId);
		assertString(betId);

		const { response } = await this.client.api.request(
			Routes.guilds.bets.delete(guildId, betId),
			{ method: "DELETE" },
		);

		return new GuildBet(response);
	}

	async fetchCount(): Promise<number> {
		const { response } = await this.client.api.request(
			Routes.bets.fetchCount(),
		);

		return response;
	}

	async getCount(guildId: string): Promise<number> {
		assertString(guildId);

		const { response } = await this.client.api.request(
			Routes.guilds.bets.getCount(guildId),
		);

		return response;
	}

	async fetchStats(): Promise<BetStats> {
		const { response } = await this.client.api.request(
			Routes.bets.fetchStats(),
		);

		return new BetStats(response);
	}

	async getStats(guildId: string): Promise<BetStats> {
		assertString(guildId);

		const { response } = await this.client.api.request(
			Routes.guilds.bets.getStats(guildId),
		);

		return new BetStats(response);
	}

	async bulkCreate(
		guildId: string,
		data: BetCreateData[],
	): Promise<GuildBet[]> {
		assertString(guildId);

		const MAX_BATCH_SIZE = 25;
		const results: GuildBet[] = [];

		const payload: APIBet[] = toSnakeCase(data);
		assertBets(payload, "/bets/bulk/create");

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
