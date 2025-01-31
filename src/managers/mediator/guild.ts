import { assertGuildMediator } from "#quikcess/assertions";
import { assertString } from "#quikcess/assertions/literal";
import type { Betting } from "#quikcess/index";
import { Routes } from "#quikcess/lib/routes";
import { Cache } from "#quikcess/services";
import { GuildMediator } from "#quikcess/structures/mediator/guildMediator";
import type { MediatorCreateData } from "#quikcess/types";
import { toSnakeCase } from "#quikcess/utils/cases";

export class GuildMediatorManager {
	public readonly cache: Cache<GuildMediator>;

	constructor(
		public readonly client: Betting,
		public readonly guildId: string,
	) {
		assertString(guildId, "GUILD_ID");
		this.cache = new Cache();
	}

	async create(data: MediatorCreateData): Promise<GuildMediator> {
		const payload = toSnakeCase(data);
		assertGuildMediator(payload, "/mediators/create");

		const { response } = await this.client.api.request(
			Routes.guilds.mediators.create(data.guildId),
			{
				method: "POST",
				body: payload,
			},
		);

		const mediator = new GuildMediator(response);
		this.cache.set(mediator.userId, mediator);
		return mediator;
	}

	// ex.: guild.mediators.fetch("123") -> acesso ao mediator em um guildId
	async fetch(
		userId: string,
		options?: {
			cache?: boolean;
		},
	): Promise<GuildMediator> {
		assertString(userId, "MEDIATOR_ID");
		const { cache = false } = options || {};

		if (cache) {
			const cached = this.cache.get(userId);
			if (cached) {
				return cached;
			}
		}

		const { response } = await this.client.api.request(
			Routes.guilds.mediators.get(this.guildId, userId),
		);

		const mediator = new GuildMediator(response);
		this.cache.set(mediator.userId, mediator);
		return mediator;
	}
}
