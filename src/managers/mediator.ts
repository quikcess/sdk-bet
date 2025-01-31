import { assertGuildMediator } from "#quikcess/assertions";
import { assertString } from "#quikcess/assertions/literal";
import { Routes } from "#quikcess/lib/routes";
import { Cache } from "#quikcess/services/cache";
import { Mediator } from "#quikcess/structures/mediator/globalMediator";
import { GuildMediator } from "#quikcess/structures/mediator/guildMediator";
import type { MediatorCreateData } from "#quikcess/types";
import { toSnakeCase } from "#quikcess/utils/cases";
import type { Betting } from "..";

// Isso é mediator global
export class MediatorManager {
	public readonly cache: Cache<Mediator>;

	constructor(public readonly client: Betting) {
		this.cache = new Cache();
	}

	// ex.: client.mediators.fetch("123") -> acesso ao mediator global
	async fetch(userId: string): Promise<Mediator> {
		assertString(userId, "MEDIATOR_ID");

		const { response } = await this.client.api.request(
			Routes.mediators.get(userId),
		);

		const data = new Mediator(response);
		this.cache.set(data.userId, data);
		return data;
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
}

// Isso é mediators por guild
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
