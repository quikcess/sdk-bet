import type {
	RESTGetAPIBlacklistsPaginationQuery,
	RESTGetAPIBlacklistsQuery,
} from "@quikcess/bet-api-types/v1";
import {
	assertBlacklist,
	assertPartialBlacklist,
} from "#quikcess/assertions/blacklist";
import { assertString } from "#quikcess/assertions/literal";
import { Routes } from "#quikcess/lib/routes";
import { Blacklist } from "#quikcess/structures/blacklist/blacklist";
import { Blacklists } from "#quikcess/structures/blacklist/index";
import { Collection } from "#quikcess/structures/collection";
import type {
	BlacklistAddData,
	BlacklistUpdateData,
} from "#quikcess/types/index";
import { toSnakeCase } from "#quikcess/utils/cases/index";
import type { Betting } from "../index";

export class BlacklistModule {
	constructor(private readonly client: Betting) {}

	async getById(targetId: string): Promise<Blacklist> {
		assertString(targetId, "TARGET_ID");

		const { response } = await this.client.api.request(
			Routes.blacklist.getById(targetId),
		);

		return new Blacklist(response);
	}

	async getAll(
		guildId?: string,
		options?: RESTGetAPIBlacklistsPaginationQuery,
	): Promise<Blacklists> {
		if (guildId) assertString(guildId, "GUILD_ID");

		const query: RESTGetAPIBlacklistsQuery = options ? options : {};
		if (guildId) query.guild_id = guildId;

		const { response } = await this.client.api.request(
			Routes.blacklist.getAll(),
			{
				query,
			},
		);

		const transformedData = new Collection(
			response.data.map((data) => [data.target_id, new Blacklist(data)]),
		);

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

		return new Blacklist(response);
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

		return new Blacklist(response);
	}

	async delete(targetId: string, guildId?: string): Promise<Blacklist> {
		assertString(targetId);
		if (guildId) assertString(guildId);

		const query = guildId ? { guild_id: guildId } : {};

		const { response } = await this.client.api.request(
			Routes.blacklist.delete(targetId),
			{ method: "DELETE", query },
		);

		return new Blacklist(response);
	}
}
