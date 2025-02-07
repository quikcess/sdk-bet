import type { RESTGetAPIGuildUsersPaginationQuery } from "@quikcess/bet-api-types/v1";
import { assertGuildUser, assertPartialGuildUser } from "#quikcess/assertions";
import { assertString } from "#quikcess/assertions/literal";
import type { Betting } from "#quikcess/index";
import { Routes } from "#quikcess/lib/routes";
import { Cache } from "#quikcess/services";
import { Collection } from "#quikcess/structures/collection";
import { GuildUser } from "#quikcess/structures/user/guildUser";
import { GuildUsers } from "#quikcess/structures/user/guildUsers";
import { GuildUserContextStats } from "#quikcess/structures/user/stats/guild";
import type {
	GuildUserCreateData,
	GuildUserUpdateData,
	GuildUsersQuery,
} from "#quikcess/types/user";
import { toSnakeCase } from "#quikcess/utils/cases";

export class GuildUserManager {
	public readonly cache: Cache<GuildUser>;

	constructor(
		public readonly client: Betting,
		public readonly guildId: string,
	) {
		assertString(guildId, "GUILD_ID");
		this.cache = new Cache<GuildUser>();
	}

	async get(
		userId: string,
		{
			upsert = false,
		}: {
			upsert?: boolean;
		} = {},
	): Promise<GuildUser> {
		assertString(userId, "USER_ID");

		const cached = this.cache.get(userId);
		if (cached) {
			return cached;
		}

		const { response } = await this.client.api.request(
			Routes.guilds.users.get(this.guildId, userId),
			{
				query: {
					upsert,
				},
			},
		);

		const data = new GuildUser(response);
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
	): Promise<GuildUser> {
		assertString(userId, "USER_ID");

		const { response } = await this.client.api.request(
			Routes.guilds.users.get(this.guildId, userId),
			{
				query: {
					upsert,
				},
			},
		);

		const data = new GuildUser(response);
		this.cache.set(data.userId, data);

		return data;
	}

	async create(data: GuildUserCreateData): Promise<GuildUser> {
		const payload = toSnakeCase(data);
		assertGuildUser(payload, "/guilds/users/create");

		const { response } = await this.client.api.request(
			Routes.guilds.users.create(data.guildId),
			{
				method: "POST",
				body: payload,
			},
		);

		const dataCreated = new GuildUser(response);
		this.cache.set(dataCreated.userId, dataCreated);

		return dataCreated;
	}

	async update(
		userId: string,
		data: GuildUserUpdateData,
		{
			upsert = false,
		}: {
			upsert?: boolean;
		} = {},
	): Promise<GuildUser> {
		assertString(userId);

		const payload = toSnakeCase(data);
		assertPartialGuildUser(payload, "/guilds/users/update");

		const { response } = await this.client.api.request(
			Routes.guilds.users.update(this.guildId, userId),
			{
				method: "PATCH",
				body: payload,
				query: {
					upsert,
				},
			},
		);

		const dataUpdated = new GuildUser(response);
		this.cache.set(dataUpdated.userId, dataUpdated);

		return dataUpdated;
	}

	async delete(userId: string): Promise<GuildUser> {
		assertString(userId);

		const { response } = await this.client.api.request(
			Routes.guilds.users.delete(this.guildId, userId),
			{ method: "DELETE" },
		);

		this.cache.delete(userId);

		return new GuildUser(response);
	}

	async getAll({
		dateStart,
		dateEnd,
		limit,
		page,
		skip,
	}: GuildUsersQuery = {}): Promise<GuildUsers> {
		const options = {
			dateStart,
			dateEnd,
			limit,
			page,
			skip,
		};

		const query: RESTGetAPIGuildUsersPaginationQuery = toSnakeCase<
			RESTGetAPIGuildUsersPaginationQuery,
			GuildUsersQuery
		>(options);
		const { response } = await this.client.api.request(
			Routes.guilds.users.getAll(this.guildId),
			{
				query,
			},
		);

		const transformedData = new Collection(
			response.data.map((data) => [data.user_id, new GuildUser(data)]),
		);

		for (const data of transformedData.values()) {
			this.cache.set(data.userId, data);
		}

		return new GuildUsers({
			currentPage: response.current_page,
			totalPages: response.total_pages,
			totalUsers: response.total_users,
			data: transformedData,
		});
	}

	async getStats(): Promise<GuildUserContextStats> {
		const { response } = await this.client.api.request(
			Routes.guilds.users.getStats(),
		);
		return new GuildUserContextStats(response);
	}
}
