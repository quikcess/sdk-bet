import type {
	APIGuild,
	RESTGetAPIGuildsPaginationQuery,
} from "@quikcess/bet-api-types/v1";
import {
	assertGuild,
	assertPartialGuild,
} from "#quikcess/assertions/guilds/assertions";
import { assertString } from "#quikcess/assertions/literal";
import { Routes } from "#quikcess/lib/routes";
import { Cache } from "#quikcess/services/cache";
import { Collection } from "#quikcess/structures/collection";
import { Guild } from "#quikcess/structures/guild/guild";
import { Guilds } from "#quikcess/structures/guild/guilds";
import { GuildStats } from "#quikcess/structures/guild/stats/guild";
import type { GuildUpdateData, GuildsQuery } from "#quikcess/types/guild";
import { toSnakeCase } from "#quikcess/utils/cases";
import type { Betting } from "../..";

export class GuildManager {
	public readonly cache: Cache<Guild>;

	constructor(private readonly client: Betting) {
		this.cache = new Cache<Guild>();
	}

	async fetch(guildId: string): Promise<Guild> {
		assertString(guildId, "GUILD_ID");

		const cached = this.cache.get(guildId);
		if (cached) {
			return cached;
		}

		const { response } = await this.client.api.request(
			Routes.guilds.get(guildId),
		);

		const data = new Guild(this.client, response);
		this.cache.set(guildId, data);

		return data;
	}

	async create(data: APIGuild): Promise<APIGuild> {
		const payload = toSnakeCase(data);
		assertGuild(payload, "/guilds/create");

		const { response } = await this.client.api.request(Routes.guilds.create(), {
			method: "POST",
			body: payload,
		});

		return response;
	}

	async update(guildID: string, data: GuildUpdateData): Promise<Guild> {
		assertString(guildID);

		const payload = toSnakeCase(data);
		assertPartialGuild(payload, "/guilds/update");

		const { response } = await this.client.api.request(
			Routes.guilds.update(guildID),
			{
				method: "PATCH",
				body: payload,
			},
		);

		return new Guild(this.client, response);
	}

	async delete(guildId: string): Promise<Guild> {
		assertString(guildId);

		const { response } = await this.client.api.request(
			Routes.guilds.delete(guildId),
			{ method: "DELETE" },
		);

		return new Guild(this.client, response);
	}

	async getAll({
		dateStart,
		dateEnd,
		limit,
		page,
		skip,
	}: GuildsQuery): Promise<Guilds> {
		const options = {
			dateStart,
			dateEnd,
			limit,
			page,
			skip,
		};

		const query: RESTGetAPIGuildsPaginationQuery = toSnakeCase<
			RESTGetAPIGuildsPaginationQuery,
			GuildsQuery
		>(options);
		const { response } = await this.client.api.request(Routes.guilds.getAll(), {
			query,
		});

		const transformedData = new Collection(
			response.data.map((data) => [
				data.guild_id,
				new Guild(this.client, data),
			]),
		);

		return new Guilds({
			currentPage: response.current_page,
			totalPages: response.total_pages,
			totalGuilds: response.total_guilds,
			data: transformedData,
		});
	}

	async fetchStats(): Promise<GuildStats> {
		const { response } = await this.client.api.request(
			Routes.guilds.getStats(),
		);
		return new GuildStats(response);
	}
}
