import { assertString } from "#quikcess/assertions/literal";
import type { Betting } from "#quikcess/index";
import { Routes } from "#quikcess/lib/routes";
import { GuildScamStats } from "#quikcess/structures/scam/stats/guild";
import type { ScamUpdateData, ScamsQuery } from "#quikcess/types/scam";
import { ScamManager } from "./global";

export class GuildScamManager extends ScamManager {
	constructor(
		public readonly client: Betting,
		public readonly guildId: string,
	) {
		super(client);
		assertString(guildId, "GUILD_ID");
	}

	async getAll(options?: Omit<ScamsQuery, "guildId">) {
		return super.getAll({ guildId: this.guildId, ...options });
	}

	async update(targetName: string, data: ScamUpdateData) {
		return super.update(targetName, data, this.guildId);
	}

	async delete(targetName: string) {
		return super.delete(targetName, this.guildId);
	}

	async getStats(): Promise<GuildScamStats> {
		const { response } = await this.client.api.request(
			Routes.guilds.scams.getStats(this.guildId),
		);
		return new GuildScamStats(response);
	}
}
