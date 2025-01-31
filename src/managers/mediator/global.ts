import { assertGuildMediator } from "#quikcess/assertions";
import { assertString } from "#quikcess/assertions/literal";
import type { Betting } from "#quikcess/index";
import { Routes } from "#quikcess/lib/routes";
import { Cache } from "#quikcess/services";
import { Mediator } from "#quikcess/structures/mediator/globalMediator";
import { GuildMediator } from "#quikcess/structures/mediator/guildMediator";
import type { MediatorCreateData } from "#quikcess/types";
import { toSnakeCase } from "#quikcess/utils/cases";

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
