import { assertBet, assertBets, assertPartialBet } from "@/assertions/bet";
import { assertString } from "@/assertions/literal";
import { Routes } from "@/lib/routes";
import { BetEntity } from "@/structures/bet/base";
import { AllBetsEntity } from "@/structures/bet/getAll";
import { BetMetrics } from "@/structures/bet/metric";
import { Collection } from "@/structures/collection";
import { toSnakeCase } from "@/utils/cases";
import type {
	APIBet,
	RESTGetAPIAllBetsQuery,
	RESTGetAPIBetsPaginationQuery,
} from "@quikcess/bet-api-types/v1";
import type { BetData, Betting } from "..";

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

	async getAll(
		guildId?: string,
		options?: RESTGetAPIBetsPaginationQuery,
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

	async create(data: BetData): Promise<BetEntity> {
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
		data: Partial<Omit<BetData, "guildId" | "createdAt" | "updatedAt">>,
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

	async has(betId: string, guildId?: string): Promise<boolean> {
		assertString(betId);
		if (guildId) assertString(guildId);

		const query = guildId ? { guild_id: guildId } : {};

		const { response } = await this.client.api.request(Routes.bets.has(betId), {
			query,
		});

		return response;
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

	async bulkCreate(data: BetData[]): Promise<BetEntity[]> {
		const payload: APIBet[] = toSnakeCase<BetData[]>(data);

		assertBets(payload, "/bets/bulk/create");

		const { response } = await this.client.api.request(
			Routes.bets.bulk.create(),
			{
				method: "POST",
				body: payload,
			},
		);

		return response.map((bet) => new BetEntity(bet));
	}

	async bulkDelete(betIds: string[]): Promise<BetEntity[]> {
		const { response } = await this.client.api.request(
			Routes.bets.bulk.delete(),
			{
				method: "DELETE",
				body: betIds,
			},
		);

		return response.map((bet) => new BetEntity(bet));
	}
}
