import { assertGuild } from "@/assertions/guilds/assertions";
import { assertString } from "@/assertions/literal";
import { Routes } from "@/lib/routes";
import { Cache } from "@/services/cache";
import { toSnakeCase } from "@/utils/cases";
import type { APIGuild } from "@quikcess/bet-api-types/v1";
import type { Betting } from "..";
import { GuildBetManager } from "./bet";

// Isso é guilds
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
}

// Isso é uma structure (guild)
export class Guild {
	public readonly bets: GuildBetManager;
	public readonly guildId: string;
	public systems: number[];

	constructor(
		public readonly client: Betting,
		data: APIGuild,
	) {
		assertString(data.guild_id, "GUILD_ID");

		this.guildId = data.guild_id;
		this.systems = data.systems;

		this.bets = new GuildBetManager(client, data.guild_id);
	}
}
