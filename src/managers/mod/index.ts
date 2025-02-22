import type {
	GuildModType,
	RESTGetAPIGuildModsPaginationQuery,
} from "@quikcess/bet-api-types/v1";
import { assertGuildMod, assertPartialGuildMod } from "#quikcess/assertions";
import { assertString } from "#quikcess/assertions/literal";
import type { Betting } from "#quikcess/index";
import { Routes } from "#quikcess/lib/routes";
import { Cache } from "#quikcess/services";
import { Collection } from "#quikcess/structures";
import { GuildMod, GuildMods } from "#quikcess/structures/mod";
import type {
	GuildModCreateData,
	GuildModUpdateData,
	GuildModsQuery,
} from "#quikcess/types/index";
import { toSnakeCase } from "#quikcess/utils/cases";

export class GuildModManager {
	public readonly cache: Cache<GuildMod>;

	constructor(
		public readonly client: Betting,
		public readonly guildId: string,
	) {
		assertString(guildId, "GUILD_ID");
		this.cache = new Cache<GuildMod>();
	}

	async get(type: GuildModType, tag: string): Promise<GuildMod> {
		assertString(type, "TYPE");
		assertString(tag, "TAG");

		const cached = this.cache.get(`${type}-${tag}`);
		if (cached) {
			return cached;
		}

		const { response } = await this.client.api.request(
			Routes.guilds.mods.get(this.guildId, type, tag),
		);

		const data = new GuildMod(response);
		this.cache.set(`${data.type}-${data.tag}`, data);

		return data;
	}

	async fetch(type: GuildModType, tag: string): Promise<GuildMod> {
		assertString(type, "TAG");
		assertString(tag, "TAG");

		const { response } = await this.client.api.request(
			Routes.guilds.mods.get(this.guildId, type, tag),
		);

		const data = new GuildMod(response);
		this.cache.set(`${data.type}-${data.tag}`, data);

		return data;
	}

	async create(data: GuildModCreateData): Promise<GuildMod> {
		const payload = toSnakeCase(data);
		assertGuildMod(payload, "/guilds/mods/create");

		const { response } = await this.client.api.request(
			Routes.guilds.mods.create(data.guildId),
			{
				method: "POST",
				body: payload,
			},
		);

		const dataCreated = new GuildMod(response);
		this.cache.set(`${dataCreated.type}-${dataCreated.tag}`, dataCreated);

		return dataCreated;
	}

	async update(
		type: GuildModType,
		tag: string,
		data: GuildModUpdateData,
	): Promise<GuildMod> {
		assertString(type, "TYPE");
		assertString(tag, "TAG");

		const payload = toSnakeCase(data);
		assertPartialGuildMod(payload, "/guilds/mods/update");

		const { response } = await this.client.api.request(
			Routes.guilds.mods.update(this.guildId, type, tag),
			{
				method: "PATCH",
				body: payload,
			},
		);

		const dataUpdated = new GuildMod(response);
		this.cache.set(`${dataUpdated.type}-${dataUpdated.tag}`, dataUpdated);

		return dataUpdated;
	}

	async delete(type: GuildModType, tag: string): Promise<GuildMod> {
		assertString(type, "TAG");
		assertString(tag, "TAG");

		const { response } = await this.client.api.request(
			Routes.guilds.mods.delete(this.guildId, type, tag),
			{ method: "DELETE" },
		);

		this.cache.delete(type);

		return new GuildMod(response);
	}

	async getAll(options: GuildModsQuery = {}): Promise<GuildMods> {
		const query: RESTGetAPIGuildModsPaginationQuery = toSnakeCase<
			RESTGetAPIGuildModsPaginationQuery,
			GuildModsQuery
		>(options);

		const { response } = await this.client.api.request(
			Routes.guilds.mods.getAll(this.guildId),
			{
				query,
			},
		);

		const transformedData = new Collection(
			response.data.map((data) => [data.tag, new GuildMod(data)]),
		);

		for (const data of transformedData.values()) {
			this.cache.set(`${data.type}-${data.tag}`, data);
		}

		return new GuildMods({
			currentPage: response.current_page,
			totalPages: response.total_pages,
			totalMods: response.total_mods,
			data: transformedData,
		});
	}
}
