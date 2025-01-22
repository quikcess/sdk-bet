import {
	assertBlacklist,
	assertPartialBlacklist,
} from "@/assertions/blacklist";
import { assertString } from "@/assertions/literal";
import { Routes } from "@/lib/routes";
import { Blacklist } from "@/structures/blacklist/base";
import { AllBlacklist } from "@/structures/blacklist/index";
import { Collection } from "@/structures/collection";
import type { BlacklistAddData, BlacklistUpdateData } from "@/types/index";
import { toSnakeCase } from "@/utils/cases/index";
import type {
	RESTGetAPIAllBlacklistQuery,
	RESTGetAPIBlacklistPaginationQuery,
} from "@quikcess/bet-api-types/v1";
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
		options?: RESTGetAPIBlacklistPaginationQuery,
	): Promise<AllBlacklist> {
		if (guildId) assertString(guildId, "GUILD_ID");

		const query: RESTGetAPIAllBlacklistQuery = options ? options : {};
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

		return new AllBlacklist({
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

	async has(targetId: string, guildId?: string): Promise<boolean> {
		assertString(targetId);
		if (guildId) assertString(guildId);

		const query = guildId ? { guild_id: guildId } : {};

		const { response } = await this.client.api.request(
			Routes.blacklist.has(targetId),
			{
				query,
			},
		);

		return response;
	}
}
