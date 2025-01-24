import { assertBet, assertBets, assertPartialBet } from "@/assertions/bet";
import { assertArrayOfStrings, assertString } from "@/assertions/literal";
import { Routes } from "@/lib/routes";
import { BetEntity } from "@/structures/bet/base";
import { AllBetsEntity } from "@/structures/bet/getAll";
import { BetMetrics } from "@/structures/bet/metric";
import { Collection } from "@/structures/collection";
import { toSnakeCase } from "@/utils/cases/index";
import type {
	APIBet,
	RESTGetAPIAllBetsQuery,
} from "@quikcess/bet-api-types/v1";
import type { BetCreateData, BetUpdateData, Betting } from "../index";

export class BetModule {
	constructor(private readonly client: Betting) {}

	// Rota getById global /bets

	async getById(guildId: string, betId: string): Promise<BetEntity> {
		assertString(guildId, "GUILD_ID");
		assertString(betId, "BET_ID");

		const { response } = await this.client.api.request(
			Routes.bets.getById(guildId, betId),
		);
		return new BetEntity(response);
	}

	async getByChannelId(guildId: string, channelId: string): Promise<BetEntity> {
		assertString(guildId, "GUILD_ID");
		assertString(channelId, "CHANNEL_ID");

		const { response } = await this.client.api.request(
			Routes.bets.getByChannelId(guildId, channelId),
		);
		return new BetEntity(response);
	}

	async getChannelIdByPlayerIds(
		guildId: string,
		playerIds: string[],
	): Promise<Record<string, string[]>> {
		assertString(guildId, "GUILD_ID");
		assertArrayOfStrings(playerIds, "PLAYER_IDS");

		const { response } = await this.client.api.request(
			Routes.bets.getChannelIdsFromPlayerId(guildId),
			{
				query: {
					player_ids: playerIds,
				},
			},
		);

		return response;
	}

	// fetchAll -> rota global

	async getAll(guildId: string, playerIds?: string[]): Promise<AllBetsEntity> {
		assertString(guildId, "GUILD_ID");

		const query: RESTGetAPIAllBetsQuery = { player_ids: playerIds ?? [] };

		const { response } = await this.client.api.request(
			Routes.bets.getAll(guildId),
			{
				query,
			},
		);

		const transformedData = new Collection(
			response.data.map((data) => [data.bet_id, new BetEntity(data)]),
		);

		return new AllBetsEntity({
			currentPage: response.current_page,
			totalPages: response.total_pages,
			totalBets: response.total_bets,
			data: transformedData,
		});
	}

	async create(data: BetCreateData): Promise<BetEntity> {
		const payload = toSnakeCase(data);
		assertBet(payload, "/bets/create");

		const { response } = await this.client.api.request(
			Routes.bets.create(data.guildId),
			{
				method: "POST",
				body: payload,
			},
		);

		return new BetEntity(response);
	}

	async update(
		guildId: string,
		betId: string,
		data: BetUpdateData,
	): Promise<BetEntity> {
		assertString(guildId);
		assertString(betId);

		const payload = toSnakeCase(data);
		assertPartialBet(payload, "/bets/update");

		const { response } = await this.client.api.request(
			Routes.bets.update(guildId, betId),
			{
				method: "PATCH",
				body: payload,
			},
		);

		return new BetEntity(response);
	}

	async delete(guildId: string, betId: string): Promise<BetEntity> {
		assertString(guildId);
		assertString(betId);

		const { response } = await this.client.api.request(
			Routes.bets.delete(guildId, betId),
			{ method: "DELETE" },
		);

		return new BetEntity(response);
	}

	// Rota de analytics global /bets

	async count(guildId: string): Promise<number> {
		assertString(guildId);

		const { response } = await this.client.api.request(
			Routes.bets.count(guildId),
		);

		return response;
	}

	async metrics(guildId: string): Promise<BetMetrics> {
		assertString(guildId);

		const { response } = await this.client.api.request(
			Routes.bets.metrics(guildId),
		);

		return new BetMetrics(response);
	}

	async bulkCreate(
		guildId: string,
		data: BetCreateData[],
	): Promise<BetEntity[]> {
		assertString(guildId);

		const MAX_BATCH_SIZE = 25;
		const results: BetEntity[] = [];

		const payload: APIBet[] = toSnakeCase(data);
		assertBets(payload, "/bets/bulk/create");

		for (let i = 0; i < payload.length; i += MAX_BATCH_SIZE) {
			const batch = payload.slice(i, i + MAX_BATCH_SIZE);

			const { response } = await this.client.api.request(
				Routes.bets.bulk.create(guildId),
				{
					method: "POST",
					body: batch,
				},
			);

			results.push(...response.map((bet) => new BetEntity(bet)));
		}

		return results;
	}

	async bulkDelete(guildId: string, betIds: string[]): Promise<BetEntity[]> {
		assertString(guildId);

		const MAX_BATCH_SIZE = 75;
		const results: BetEntity[] = [];

		for (let i = 0; i < betIds.length; i += MAX_BATCH_SIZE) {
			const batch = betIds.slice(i, i + MAX_BATCH_SIZE);

			const { response } = await this.client.api.request(
				Routes.bets.bulk.delete(guildId),
				{
					method: "DELETE",
					body: batch,
				},
			);

			results.push(...response.map((bet) => new BetEntity(bet)));
		}

		return results;
	}

	async getThreadWaitTime(guildId: string): Promise<number> {
		assertString(guildId);
		const { response } = await this.client.api.request(
			Routes.bets.getThreadWaitTime(guildId),
		);
		return response;
	}
}
