import type { RESTGetAPIBlacklistsQuery } from "@quikcess/bet-api-types/v1";
import { assertBlacklist, assertPartialBlacklist } from "#quikcess/assertions";
import { assertString } from "#quikcess/assertions/literal";
import type { Betting } from "#quikcess/index";
import { Routes } from "#quikcess/lib/routes";
import { Cache } from "#quikcess/services";
import { Blacklist, Blacklists } from "#quikcess/structures/blacklist";
import { BlacklistStats } from "#quikcess/structures/blacklist/stats/global";
import { Collection } from "#quikcess/structures/collection";
import type {
	BlacklistAddData,
	BlacklistUpdateData,
	BlacklistsQuery,
} from "#quikcess/types";
import { toSnakeCase } from "#quikcess/utils/cases";

export class BlacklistManager {
	public readonly cache: Cache<Blacklist>;

	constructor(public readonly client: Betting) {
		this.cache = new Cache<Blacklist>();
	}

	async getById(targetId: string): Promise<Blacklist> {
		assertString(targetId, "TARGET_ID");

		const { response } = await this.client.api.request(
			Routes.blacklist.getById(targetId),
		);

		const data = new Blacklist(response);
		this.cache.set(data.targetId, data);

		return data;
	}

	async getAll({
		guildId,
		dateStart,
		dateEnd,
		limit,
		page,
		skip,
	}: BlacklistsQuery): Promise<Blacklists> {
		if (guildId) assertString(guildId, "GUILD_ID");

		const options = {
			guildId,
			dateStart,
			dateEnd,
			limit,
			page,
			skip,
		};

		const query: RESTGetAPIBlacklistsQuery = toSnakeCase<
			RESTGetAPIBlacklistsQuery,
			BlacklistsQuery
		>(options);

		const { response } = await this.client.api.request(
			Routes.blacklist.getAll(),
			{ query },
		);

		const transformedData = new Collection(
			response.data.map((data) => [data.target_id, new Blacklist(data)]),
		);

		for (const data of transformedData.values()) {
			this.cache.set(data.targetId, data);
		}

		return new Blacklists({
			currentPage: response.current_page,
			totalPages: response.total_pages,
			totalEntries: response.total_entries,
			data: transformedData,
		});
	}

	async add(data: BlacklistAddData): Promise<Blacklist> {
		const payload = toSnakeCase(data);
		assertBlacklist(payload, "/blacklist/add");

		const { response } = await this.client.api.request(Routes.blacklist.add(), {
			method: "POST",
			body: payload,
		});

		const dataCreated = new Blacklist(response);
		this.cache.set(dataCreated.targetId, dataCreated);

		return dataCreated;
	}

	async update(
		targetId: string,
		data: BlacklistUpdateData,
		guildId?: string,
	): Promise<Blacklist> {
		assertString(targetId);
		if (guildId) assertString(guildId);

		const payload = toSnakeCase(data);
		assertPartialBlacklist(payload, "/blacklist/update");

		const query = guildId ? { guild_id: guildId } : {};

		const { response } = await this.client.api.request(
			Routes.blacklist.update(targetId),
			{
				method: "PATCH",
				body: payload,
				query,
			},
		);

		const dataUpdated = new Blacklist(response);
		this.cache.set(dataUpdated.targetId, dataUpdated);

		return dataUpdated;
	}

	async delete(targetId: string, guildId?: string): Promise<Blacklist> {
		assertString(targetId);
		if (guildId) assertString(guildId);

		const query = guildId ? { guild_id: guildId } : {};

		const { response } = await this.client.api.request(
			Routes.blacklist.delete(targetId),
			{ method: "DELETE", query },
		);

		this.cache.delete(targetId);

		return new Blacklist(response);
	}

	async fetchStats(): Promise<BlacklistStats> {
		const { response } = await this.client.api.request(
			Routes.blacklist.getStats(),
		);
		return new BlacklistStats(response);
	}
}
