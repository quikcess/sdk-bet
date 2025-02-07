import type {
	APIGuildQueue,
	RESTGetAPIGuildQueuesPaginationQuery,
} from "@quikcess/bet-api-types/v1";
import {
	assertGuildQueue,
	assertGuildQueues,
	assertPartialGuildQueue,
} from "#quikcess/assertions";
import { assertString } from "#quikcess/assertions/literal";
import type {
	Betting,
	GuildQueueCreateData,
	GuildQueueUpdateData,
	GuildQueuesQuery,
} from "#quikcess/index";
import { Routes } from "#quikcess/lib/routes";
import { Cache } from "#quikcess/services";
import { Collection } from "#quikcess/structures";
import { GuildQueue } from "#quikcess/structures/queue/queue";
import { GuildQueues } from "#quikcess/structures/queue/queues";
import { toSnakeCase } from "#quikcess/utils/cases";

export class GuildQueueManager {
	public readonly cache: Cache<GuildQueue>;

	constructor(
		public readonly client: Betting,
		public readonly guildId: string,
	) {
		assertString(guildId, "GUILD_ID");
		this.cache = new Cache<GuildQueue>();
	}

	async get(queueId: string): Promise<GuildQueue> {
		assertString(queueId, "QUEUE_ID");

		const cached = this.cache.get(queueId);
		if (cached) {
			return cached;
		}

		const { response } = await this.client.api.request(
			Routes.guilds.queues.get(this.guildId, queueId),
		);

		const data = new GuildQueue(response);
		this.cache.set(data.queueId, data);

		return data;
	}

	async fetch(queueId: string): Promise<GuildQueue> {
		assertString(queueId, "QUEUE_ID");

		const { response } = await this.client.api.request(
			Routes.guilds.queues.get(this.guildId, queueId),
		);

		const data = new GuildQueue(response);
		this.cache.set(data.queueId, data);

		return data;
	}

	async create(data: GuildQueueCreateData): Promise<GuildQueue> {
		const payload = toSnakeCase(data);
		assertGuildQueue(payload, "/guilds/queues/create");

		const { response } = await this.client.api.request(
			Routes.guilds.queues.create(data.guildId),
			{
				method: "POST",
				body: payload,
			},
		);

		const dataCreated = new GuildQueue(response);
		this.cache.set(dataCreated.queueId, dataCreated);

		return dataCreated;
	}

	async update(
		queueId: string,
		data: GuildQueueUpdateData,
	): Promise<GuildQueue> {
		assertString(queueId);

		const payload = toSnakeCase(data);
		assertPartialGuildQueue(payload, "/guilds/queues/update");

		const { response } = await this.client.api.request(
			Routes.guilds.queues.update(this.guildId, queueId),
			{
				method: "PATCH",
				body: payload,
			},
		);

		const dataUpdated = new GuildQueue(response);
		this.cache.set(dataUpdated.queueId, dataUpdated);

		return dataUpdated;
	}

	async delete(queueId: string): Promise<GuildQueue> {
		assertString(queueId);

		const { response } = await this.client.api.request(
			Routes.guilds.queues.delete(this.guildId, queueId),
			{ method: "DELETE" },
		);

		this.cache.delete(queueId);

		return new GuildQueue(response);
	}

	async getAll({
		dateStart,
		dateEnd,
		limit,
		page,
		skip,
	}: GuildQueuesQuery = {}): Promise<GuildQueues> {
		const options = {
			dateStart,
			dateEnd,
			limit,
			page,
			skip,
		};

		const query: RESTGetAPIGuildQueuesPaginationQuery = toSnakeCase<
			RESTGetAPIGuildQueuesPaginationQuery,
			GuildQueuesQuery
		>(options);
		const { response } = await this.client.api.request(
			Routes.guilds.queues.getAll(this.guildId),
			{
				query,
			},
		);

		const transformedData = new Collection(
			response.data.map((data) => [data.queue_id, new GuildQueue(data)]),
		);

		for (const data of transformedData.values()) {
			this.cache.set(data.queueId, data);
		}

		return new GuildQueues({
			currentPage: response.current_page,
			totalPages: response.total_pages,
			totalQueues: response.total_queues,
			data: transformedData,
		});
	}

	async bulkCreate(data: GuildQueueCreateData[]): Promise<GuildQueue[]> {
		const MAX_BATCH_SIZE = 200;
		const results: GuildQueue[] = [];

		const payload: APIGuildQueue[] = toSnakeCase(data);
		assertGuildQueues(payload, "/queues/bulk/create");

		for (let i = 0; i < payload.length; i += MAX_BATCH_SIZE) {
			const batch = payload.slice(i, i + MAX_BATCH_SIZE);

			const { response } = await this.client.api.request(
				Routes.guilds.queues.bulk.create(this.guildId),
				{
					method: "POST",
					body: batch,
				},
			);

			results.push(
				...response.map((bet) => {
					const dataCreated = new GuildQueue(bet);
					this.cache.set(dataCreated.queueId, dataCreated);
					return dataCreated;
				}),
			);
		}

		return results;
	}

	async bulkDelete(ids: string[]): Promise<GuildQueue[]> {
		const MAX_BATCH_SIZE = 250;
		const results: GuildQueue[] = [];

		for (let i = 0; i < ids.length; i += MAX_BATCH_SIZE) {
			const batch = ids.slice(i, i + MAX_BATCH_SIZE);

			const { response } = await this.client.api.request(
				Routes.guilds.queues.bulk.delete(this.guildId),
				{
					method: "DELETE",
					body: batch,
				},
			);

			results.push(
				...response.map((bet) => {
					const dataDeleted = new GuildQueue(bet);
					this.cache.delete(dataDeleted.queueId);
					return dataDeleted;
				}),
			);
		}

		return results;
	}
}
