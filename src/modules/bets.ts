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

	async getById(betId: string): Promise<BetEntity> {
		assertString(betId, "BET_ID");

		const { response } = await this.client.api.request(
			Routes.bets.getById(betId),
		);
		return new BetEntity(response);
	}

	async getByChannelId(channelId: string): Promise<BetEntity> {
		assertString(channelId, "CHANNEL_ID");

		const { response } = await this.client.api.request(
			Routes.bets.getByChannelId(channelId),
		);
		return new BetEntity(response);
	}

	async getChannelIdByPlayerIds(
		playerIds: string[],
	): Promise<Record<string, string[]>> {
		assertArrayOfStrings(playerIds, "PLAYER_IDS");

		const { response } = await this.client.api.request(
			Routes.bets.getChannelIdsFromPlayerId(),
			{
				query: {
					player_ids: playerIds,
				},
			},
		);

		return response;
	}

	async getAll(
		guildId?: string,
		options?: RESTGetAPIAllBetsQuery,
	): Promise<AllBetsEntity> {
		if (guildId) assertString(guildId, "GUILD_ID");

		const query: RESTGetAPIAllBetsQuery = options ? options : {};
		if (guildId) query.guild_id = guildId;

		const { response } = await this.client.api.request(Routes.bets.getAll(), {
			query,
		});

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

		const { response } = await this.client.api.request(Routes.bets.create(), {
			method: "POST",
			body: payload,
		});

		return new BetEntity(response);
	}

	async update(
		betId: string,
		data: BetUpdateData,
		guildId?: string,
	): Promise<BetEntity> {
		assertString(betId);
		if (guildId) assertString(guildId);

		const payload = toSnakeCase(data);
		assertPartialBet(payload, "/bets/update");

		const query = guildId ? { guild_id: guildId } : {};

		const { response } = await this.client.api.request(
			Routes.bets.update(betId),
			{
				method: "PATCH",
				body: payload,
				query,
			},
		);

		return new BetEntity(response);
	}

	async delete(betId: string, guildId?: string): Promise<BetEntity> {
		assertString(betId);
		if (guildId) assertString(guildId);

		const query = guildId ? { guild_id: guildId } : {};

		const { response } = await this.client.api.request(
			Routes.bets.delete(betId),
			{ method: "DELETE", query },
		);

		return new BetEntity(response);
	}

	async count(guildId?: string): Promise<number> {
		if (guildId) assertString(guildId);

		const query = guildId ? { guild_id: guildId } : {};

		const { response } = await this.client.api.request(Routes.bets.count(), {
			query,
		});

		return response;
	}

	async metrics(guildId?: string): Promise<BetMetrics> {
		if (guildId) assertString(guildId);

		const query = guildId ? { guild_id: guildId } : {};

		const { response } = await this.client.api.request(Routes.bets.metrics(), {
			query,
		});

		return new BetMetrics(response);
	}

	async bulkCreate(data: BetCreateData[]): Promise<BetEntity[]> {
		const MAX_BATCH_SIZE = 25;
		const results: BetEntity[] = [];

		const payload: APIBet[] = toSnakeCase(data);
		assertBets(payload, "/bets/bulk/create");

		for (let i = 0; i < payload.length; i += MAX_BATCH_SIZE) {
			const batch = payload.slice(i, i + MAX_BATCH_SIZE);

			const { response } = await this.client.api.request(
				Routes.bets.bulk.create(),
				{
					method: "POST",
					body: batch,
				},
			);

			results.push(...response.map((bet) => new BetEntity(bet)));
		}

		return results;
	}

	async bulkDelete(betIds: string[]): Promise<BetEntity[]> {
		const MAX_BATCH_SIZE = 75;
		const results: BetEntity[] = [];

		for (let i = 0; i < betIds.length; i += MAX_BATCH_SIZE) {
			const batch = betIds.slice(i, i + MAX_BATCH_SIZE);

			const { response } = await this.client.api.request(
				Routes.bets.bulk.delete(),
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
