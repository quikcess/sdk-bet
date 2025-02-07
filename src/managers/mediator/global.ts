import type { RESTGetAPIGuildMediatorsPaginationQuery } from "@quikcess/bet-api-types/v1";
import { assertString } from "#quikcess/assertions/literal";
import type { Betting, GuildMediatorsQuery } from "#quikcess/index";
import { Routes } from "#quikcess/lib/routes";
import { Cache } from "#quikcess/services";
import { Collection } from "#quikcess/structures/collection";
import { Mediator } from "#quikcess/structures/mediator/globalMediator";
import { Mediators } from "#quikcess/structures/mediator/globalMediators";
import { MediatorContextStats } from "#quikcess/structures/mediator/stats/global";
import { toSnakeCase } from "#quikcess/utils/cases";

export class MediatorManager {
	public readonly cache: Cache<Mediator>;

	constructor(public readonly client: Betting) {
		this.cache = new Cache<Mediator>();
	}

	// Global Mediator
	async fetch(
		userId: string,
		{
			upsert = false,
		}: {
			upsert?: boolean;
		} = {},
	): Promise<Mediator> {
		assertString(userId, "USER_ID");

		const { response } = await this.client.api.request(
			Routes.mediators.get(userId),
			{
				query: {
					upsert,
				},
			},
		);

		const data = new Mediator(response);
		this.cache.set(data.userId, data);

		return data;
	}

	// Global mediator
	async fetchAll({
		dateStart,
		dateEnd,
		limit,
		page,
		skip,
	}: GuildMediatorsQuery = {}): Promise<Mediators> {
		const options = {
			dateStart,
			dateEnd,
			limit,
			page,
			skip,
		};

		const query: RESTGetAPIGuildMediatorsPaginationQuery = toSnakeCase<
			RESTGetAPIGuildMediatorsPaginationQuery,
			GuildMediatorsQuery
		>(options);
		const { response } = await this.client.api.request(
			Routes.mediators.getAll(),
			{
				query,
			},
		);

		const transformedData = new Collection(
			response.data.map((data) => [data.user_id, new Mediator(data)]),
		);

		for (const data of transformedData.values()) {
			this.cache.set(data.userId, data);
		}

		return new Mediators({
			currentPage: response.current_page,
			totalPages: response.total_pages,
			totalMediators: response.total_mediators,
			data: transformedData,
		});
	}

	// Global mediator
	async fetchStats(): Promise<MediatorContextStats> {
		const { response } = await this.client.api.request(
			Routes.mediators.getStats(),
		);
		return new MediatorContextStats(response);
	}

	// Global mediator
	async fetchStatsFromUser(userId: string): Promise<MediatorContextStats> {
		const { response } = await this.client.api.request(
			Routes.mediators.getStatsFromUser(userId),
		);
		return new MediatorContextStats(response);
	}
}
