import type { RESTGetAPIGuildMediatorsPaginationQuery } from "@quikcess/bet-api-types/v1";
import {
	assertGuildMediator,
	assertPartialGuildMediator,
} from "#quikcess/assertions";
import { assertString } from "#quikcess/assertions/literal";
import type { Betting } from "#quikcess/index";
import { Routes } from "#quikcess/lib/routes";
import { Cache } from "#quikcess/services";
import { Collection } from "#quikcess/structures/collection";
import { GuildMediator } from "#quikcess/structures/mediator/guildMediator";
import { GuildMediators } from "#quikcess/structures/mediator/guildMediators";
import { GuildMediatorContextStats } from "#quikcess/structures/mediator/stats/guild";
import type {
	GuildMediatorCreateData,
	GuildMediatorUpdateData,
	GuildMediatorsQuery,
} from "#quikcess/types";
import { toSnakeCase } from "#quikcess/utils/cases";

export class GuildMediatorManager {
	public readonly cache: Cache<GuildMediator>;

	constructor(
		public readonly client: Betting,
		public readonly guildId: string,
	) {
		assertString(guildId, "GUILD_ID");
		this.cache = new Cache<GuildMediator>();
	}

	async get(
		userId: string,
		{
			upsert = false,
		}: {
			upsert?: boolean;
		} = {},
	): Promise<GuildMediator> {
		assertString(userId, "USER_ID");

		const cached = this.cache.get(userId);
		if (cached) {
			return cached;
		}

		const { response } = await this.client.api.request(
			Routes.guilds.mediators.get(this.guildId, userId),
			{
				query: {
					upsert,
				},
			},
		);

		const data = new GuildMediator(response);
		this.cache.set(data.userId, data);

		return data;
	}

	async fetch(
		userId: string,
		{
			upsert = false,
		}: {
			upsert?: boolean;
		} = {},
	): Promise<GuildMediator> {
		assertString(userId, "USER_ID");

		const { response } = await this.client.api.request(
			Routes.guilds.mediators.get(this.guildId, userId),
			{
				query: {
					upsert,
				},
			},
		);

		const data = new GuildMediator(response);
		this.cache.set(data.userId, data);

		return data;
	}

	async create(data: GuildMediatorCreateData): Promise<GuildMediator> {
		const payload = toSnakeCase(data);
		assertGuildMediator(payload, "/guilds/mediators/create");

		const { response } = await this.client.api.request(
			Routes.guilds.mediators.create(data.guildId),
			{
				method: "POST",
				body: payload,
			},
		);

		const dataCreated = new GuildMediator(response);
		this.cache.set(dataCreated.userId, dataCreated);

		return dataCreated;
	}

	async update(
		userId: string,
		data: GuildMediatorUpdateData,
		{
			upsert = false,
		}: {
			upsert?: boolean;
		} = {},
	): Promise<GuildMediator> {
		assertString(userId);

		const payload = toSnakeCase(data);
		assertPartialGuildMediator(payload, "/guilds/mediators/update");

		const { response } = await this.client.api.request(
			Routes.guilds.mediators.update(this.guildId, userId),
			{
				method: "PATCH",
				body: payload,
				query: {
					upsert,
				},
			},
		);

		const dataUpdated = new GuildMediator(response);
		this.cache.set(dataUpdated.userId, dataUpdated);

		return dataUpdated;
	}

	async delete(userId: string): Promise<GuildMediator> {
		assertString(userId);

		const { response } = await this.client.api.request(
			Routes.guilds.mediators.delete(this.guildId, userId),
			{ method: "DELETE" },
		);

		this.cache.delete(userId);

		return new GuildMediator(response);
	}

	async getAll({
		dateStart,
		dateEnd,
		limit,
		page,
		skip,
	}: GuildMediatorsQuery): Promise<GuildMediators> {
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
			Routes.guilds.mediators.getAll(this.guildId),
			{
				query,
			},
		);

		const transformedData = new Collection(
			response.data.map((data) => [data.user_id, new GuildMediator(data)]),
		);

		for (const data of transformedData.values()) {
			this.cache.set(data.userId, data);
		}

		return new GuildMediators({
			currentPage: response.current_page,
			totalPages: response.total_pages,
			totalMediators: response.total_mediators,
			data: transformedData,
		});
	}

	async getStats(): Promise<GuildMediatorContextStats> {
		const { response } = await this.client.api.request(
			Routes.guilds.mediators.getStats(),
		);
		return new GuildMediatorContextStats(response);
	}
}
