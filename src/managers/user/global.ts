import { assertGuildUser } from "#quikcess/assertions";
import { assertString } from "#quikcess/assertions/literal";
import type { Betting } from "#quikcess/index";
import { Routes } from "#quikcess/lib/routes";
import { Cache } from "#quikcess/services";
import { User } from "#quikcess/structures/user/globalUser";
import { GuildUser } from "#quikcess/structures/user/guildUser";
import type { UserCreateData } from "#quikcess/types/user";
import { toSnakeCase } from "#quikcess/utils/cases";

export class UserManager {
	public readonly cache: Cache<User>;

	constructor(public readonly client: Betting) {
		this.cache = new Cache();
	}

	// ex.: client.users.fetch("123") -> acesso ao user global
	async fetch(userId: string): Promise<User> {
		assertString(userId, "USER_ID");

		const { response } = await this.client.api.request(
			Routes.users.get(userId),
		);

		const data = new User(response);
		this.cache.set(data.userId, data);
		return data;
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
}
