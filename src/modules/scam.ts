import { assertString } from "@/assertions/literal";
import { assertPartialScam, assertScam } from "@/assertions/scam";
import { Routes } from "@/lib/routes";
import { Collection } from "@/structures/collection";
import { AllScams } from "@/structures/scam";
import { Scam } from "@/structures/scam/base";
import type { ScamData } from "@/types/scam";
import { toSnakeCase } from "@/utils/cases";
import type {
	RESTGetAPIAllScamsQuery,
	RESTGetAPIScamPaginationQuery,
} from "@quikcess/bet-api-types/v1";
import type { Betting } from "..";

export class ScamModule {
	constructor(private readonly client: Betting) {}

	async getByName(targetName: string): Promise<Scam> {
		assertString(targetName, "TARGET_NAME");

		const { response } = await this.client.api.request(
			Routes.scam.getByName(targetName),
		);

		return new Scam(response);
	}

	async getSimilar(targetName: string): Promise<Collection<string, Scam>> {
		assertString(targetName, "TARGET_NAME");

		const { response } = await this.client.api.request(
			Routes.scam.getSimilar(targetName),
		);

		return new Collection(
			response.map((data) => [data.target_name, new Scam(data)]),
		);
	}

	async getAll(
		guildId?: string,
		options?: RESTGetAPIScamPaginationQuery,
	): Promise<AllScams> {
		if (guildId) assertString(guildId, "GUILD_ID");

		const query: RESTGetAPIAllScamsQuery = options ? options : {};
		if (guildId) query.guild_id = guildId;

		const { response } = await this.client.api.request(Routes.scam.getAll(), {
			query,
		});

		const transformedData = new Collection(
			response.data.map((data) => [data.target_name, new Scam(data)]),
		);

		return new AllScams({
			currentPage: response.current_page,
			totalPages: response.total_pages,
			totalEntries: response.total_entries,
			data: transformedData,
		});
	}

	async add(data: ScamData): Promise<Scam> {
		const payload = toSnakeCase(data);
		assertScam(payload, "/scam/add");

		const { response } = await this.client.api.request(Routes.scam.add(), {
			method: "POST",
			body: payload,
		});

		return new Scam(response);
	}

	async update(
		targetName: string,
		data: Partial<Omit<ScamData, "guildId" | "createdAt" | "updatedAt">>,
		guildId?: string,
	): Promise<Scam> {
		assertString(targetName);
		if (guildId) assertString(guildId);

		const payload = toSnakeCase(data);
		assertPartialScam(payload, "/scam/update");

		const query = guildId ? { guild_id: guildId } : {};

		const { response } = await this.client.api.request(
			Routes.scam.update(targetName),
			{
				method: "PATCH",
				body: payload,
				query,
			},
		);

		return new Scam(response);
	}

	async delete(targetName: string, guildId?: string): Promise<Scam> {
		assertString(targetName);
		if (guildId) assertString(guildId);

		const query = guildId ? { guild_id: guildId } : {};

		const { response } = await this.client.api.request(
			Routes.scam.delete(targetName),
			{ method: "DELETE", query },
		);

		return new Scam(response);
	}

	async has(targetName: string, guildId?: string): Promise<boolean> {
		assertString(targetName);
		if (guildId) assertString(guildId);

		const query = guildId ? { guild_id: guildId } : {};

		const { response } = await this.client.api.request(
			Routes.scam.has(targetName),
			{
				query,
			},
		);

		return response;
	}
}
