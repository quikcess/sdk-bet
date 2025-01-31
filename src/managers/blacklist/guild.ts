import { assertString } from "#quikcess/assertions/literal";
import type {
	Betting,
	BlacklistUpdateData,
	BlacklistsQuery,
} from "#quikcess/index";
import { Routes } from "#quikcess/lib/routes";
import { Cache } from "#quikcess/services";
import type { Blacklist } from "#quikcess/structures/blacklist";
import { GuildBlacklistStats } from "#quikcess/structures/blacklist/stats/guild";
import { BlacklistManager } from "./global";

export class GuildBlacklistManager extends BlacklistManager {
	public readonly cache: Cache<Blacklist>;

	constructor(
		public readonly client: Betting,
		public readonly guildId: string,
	) {
		super(client);
		assertString(guildId, "GUILD_ID");
		this.cache = new Cache();
	}

	async getAll(options?: Omit<BlacklistsQuery, "guildId">) {
		return super.getAll({ guildId: this.guildId, ...options });
	}

	async update(targetName: string, data: BlacklistUpdateData) {
		return super.update(targetName, data, this.guildId);
	}

	async delete(targetName: string) {
		return super.delete(targetName, this.guildId);
	}

	async getStats(): Promise<GuildBlacklistStats> {
		const { response } = await this.client.api.request(
			Routes.guilds.blacklist.getStats(this.guildId),
		);

		return new GuildBlacklistStats(response);
	}
}
