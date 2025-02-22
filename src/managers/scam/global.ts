import type { RESTGetAPIScamsQuery } from "@quikcess/bet-api-types/v1";
import { assertPartialScam, assertScam } from "#quikcess/assertions";
import { assertString } from "#quikcess/assertions/literal";
import type { Betting } from "#quikcess/index";
import { Routes } from "#quikcess/lib/routes";
import { Cache } from "#quikcess/services";
import { Collection } from "#quikcess/structures/collection";
import { Scam, Scams } from "#quikcess/structures/scam";
import { ScamStats } from "#quikcess/structures/scam/stats/global";
import type {
	ScamData,
	ScamUpdateData,
	ScamsQuery,
} from "#quikcess/types/index";
import { toSnakeCase } from "#quikcess/utils/cases";

export class ScamManager {
	public readonly cache: Cache<Scam>;

	constructor(public readonly client: Betting) {
		this.cache = new Cache<Scam>();
	}

	async getByName(targetName: string): Promise<Scam> {
		assertString(targetName, "TARGET_NAME");

		const { response } = await this.client.api.request(
			Routes.scams.getByName(targetName),
		);

		const data = new Scam(response);
		this.cache.set(data.targetName, data);

		return data;
	}

	async getSimilar(targetName: string): Promise<Collection<string, Scam>> {
		assertString(targetName, "TARGET_NAME");

		const { response } = await this.client.api.request(
			Routes.scams.getSimilar(targetName),
		);

		for (const data of response) {
			this.cache.set(data.target_name, new Scam(data));
		}

		return new Collection(
			response.map((data) => [data.target_name, new Scam(data)]),
		);
	}

	async getAll({
		guildId,
		dateStart,
		dateEnd,
		limit,
		page,
		skip,
	}: ScamsQuery = {}): Promise<Scams> {
		if (guildId) assertString(guildId, "GUILD_ID");

		const options = {
			guildId,
			dateStart,
			dateEnd,
			limit,
			page,
			skip,
		};

		const query: RESTGetAPIScamsQuery = toSnakeCase<
			RESTGetAPIScamsQuery,
			ScamsQuery
		>(options);

		const { response } = await this.client.api.request(Routes.scams.getAll(), {
			query,
		});

		const transformedData = new Collection(
			response.data.map((data) => [data.target_name, new Scam(data)]),
		);

		for (const data of transformedData.values()) {
			this.cache.set(data.targetName, data);
		}

		return new Scams({
			currentPage: response.current_page,
			totalPages: response.total_pages,
			totalEntries: response.total_entries,
			data: transformedData,
		});
	}

	async add(data: ScamData): Promise<Scam> {
		const payload = toSnakeCase(data);
		assertScam(payload, "/scam/add");

		const { response } = await this.client.api.request(Routes.scams.add(), {
			method: "POST",
			body: payload,
		});

		const dataCreated = new Scam(response);
		this.cache.set(dataCreated.targetName, dataCreated);

		return dataCreated;
	}

	async update(
		targetName: string,
		data: ScamUpdateData,
		guildId?: string,
	): Promise<Scam> {
		assertString(targetName);
		if (guildId) assertString(guildId);

		const payload = toSnakeCase(data);
		assertPartialScam(payload, "/scam/update");

		const query = guildId ? { guild_id: guildId } : {};

		const { response } = await this.client.api.request(
			Routes.scams.update(targetName),
			{
				method: "PATCH",
				body: payload,
				query,
			},
		);

		const dataUpdated = new Scam(response);
		this.cache.set(dataUpdated.targetName, dataUpdated);

		return dataUpdated;
	}

	async delete(targetName: string, guildId?: string): Promise<Scam> {
		assertString(targetName);
		if (guildId) assertString(guildId);

		const query = guildId ? { guild_id: guildId } : {};

		const { response } = await this.client.api.request(
			Routes.scams.delete(targetName),
			{ method: "DELETE", query },
		);

		this.cache.delete(targetName);

		return new Scam(response);
	}

	async fetchStats(): Promise<ScamStats> {
		const { response } = await this.client.api.request(Routes.scams.getStats());
		return new ScamStats(response);
	}
}
