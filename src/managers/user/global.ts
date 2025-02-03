import type { RESTGetAPIGuildUsersPaginationQuery } from "@quikcess/bet-api-types/v1";
import { assertString } from "#quikcess/assertions/literal";
import type { Betting, LocalCache } from "#quikcess/index";
import { Routes } from "#quikcess/lib/routes";
import { Cache } from "#quikcess/services";
import { Collection } from "#quikcess/structures/collection";
import { User } from "#quikcess/structures/user/globalUser";
import { Users } from "#quikcess/structures/user/globalUsers";
import { UserContextStats } from "#quikcess/structures/user/stats/global";
import type { GuildUsersQuery } from "#quikcess/types/user";
import { toSnakeCase } from "#quikcess/utils/cases";

export class UserManager {
	public readonly cache: Cache<User>;

	constructor(public readonly client: Betting) {
		this.cache = new Cache<User>();
	}

	// Global User
	async fetch(userId: string): Promise<User> {
		assertString(userId, "USER_ID");

		const { response } = await this.client.api.request(
			Routes.users.get(userId),
		);

		const data = new User(response);
		this.cache.set(data.userId, data);

		return data;
	}

	// Global user
	async fetchAll({
		dateStart,
		dateEnd,
		limit,
		page,
		skip,
	}: GuildUsersQuery): Promise<Users> {
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
		const { response } = await this.client.api.request(Routes.users.getAll(), {
			query,
		});

		const transformedData = new Collection(
			response.data.map((data) => [data.user_id, new User(data)]),
		);

		for (const data of transformedData.values()) {
			this.cache.set(data.userId, data);
		}

		return new Users({
			currentPage: response.current_page,
			totalPages: response.total_pages,
			totalUsers: response.total_users,
			data: transformedData,
		});
	}

	// Global user
	async fetchStats(): Promise<UserContextStats> {
		const { response } = await this.client.api.request(Routes.users.getStats());
		return new UserContextStats(response);
	}

	// Global user
	async fetchStatsFromUser(userId: string): Promise<UserContextStats> {
		const { response } = await this.client.api.request(
			Routes.users.getStatsFromUser(userId),
		);
		return new UserContextStats(response);
	}
}
