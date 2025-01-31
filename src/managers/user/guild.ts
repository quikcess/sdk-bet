import { assertGuildUser } from "#quikcess/assertions";
import { assertString } from "#quikcess/assertions/literal";
import type { Betting } from "#quikcess/index";
import { Routes } from "#quikcess/lib/routes";
import { Cache } from "#quikcess/services";
import { GuildUser } from "#quikcess/structures/user/guildUser";
import type { UserCreateData } from "#quikcess/types/user";
import { toSnakeCase } from "#quikcess/utils/cases";

export class GuildUserManager {
	public readonly cache: Cache<GuildUser>;

	constructor(
		public readonly client: Betting,
		public readonly guildId: string,
	) {
		assertString(guildId, "GUILD_ID");
		this.cache = new Cache();
	}

	async create(data: UserCreateData): Promise<GuildUser> {
		const payload = toSnakeCase(data);
		assertGuildUser(payload, "/users/create");

		const { response } = await this.client.api.request(
			Routes.guilds.users.create(data.guildId),
			{
				method: "POST",
				body: payload,
			},
		);

		const user = new GuildUser(response);
		this.cache.set(user.userId, user);
		return user;
	}

	// ex.: guild.users.fetch("123") -> acesso ao user em um guildId
	async fetch(
		userId: string,
		options?: {
			cache?: boolean;
		},
	): Promise<GuildUser> {
		assertString(userId, "USER_ID");
		const { cache = false } = options || {};

		if (cache) {
			const cached = this.cache.get(userId);
			if (cached) {
				return cached;
			}
		}

		const { response } = await this.client.api.request(
			Routes.guilds.users.get(this.guildId, userId),
		);

		const user = new GuildUser(response);
		this.cache.set(user.userId, user);
		return user;
	}
}
