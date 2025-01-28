import { assertBet } from "@/assertions/bet";
import { assertString } from "@/assertions/literal";
import { Routes } from "@/lib/routes";
import { Cache } from "@/services/cache";
import { GuildBet } from "@/structures";
import { toSnakeCase } from "@/utils/cases";
import type { BetCreateData, Betting } from "..";

// Isso é bets global
export class BetManager {
	public readonly cache: Cache<GuildBet>;

	constructor(public readonly client: Betting) {
		this.cache = new Cache();
	}

	// ex.: client.bets.fetch("123") -> acesso sem guildId
	async fetch(betId: string): Promise<GuildBet> {
		assertString(betId, "BET_ID");

		const { response } = await this.client.api.request(
			Routes.bets.fetch(betId),
		);

		const bet = new GuildBet(response);
		this.cache.set(bet.betId, bet);
		return bet;
	}
}

// Isso é bets por guild
export class GuildBetManager {
	public readonly cache: Cache<GuildBet>;

	constructor(
		public readonly client: Betting,
		public readonly guildId: string,
	) {
		assertString(guildId, "GUILD_ID");
		this.cache = new Cache();
	}

	async create(data: BetCreateData): Promise<GuildBet> {
		const payload = toSnakeCase(data);
		assertBet(payload, "/bets/create");

		const { response } = await this.client.api.request(
			Routes.guilds.bets.create(data.guildId),
			{
				method: "POST",
				body: payload,
			},
		);

		const bet = new GuildBet(response);
		this.cache.set(bet.betId, bet);
		return bet;
	}

	// ex.: guild.bets.fetch("123") -> acesso com o guildId
	async fetch(
		betId: string,
		options?: {
			cache?: boolean;
		},
	): Promise<GuildBet> {
		assertString(betId, "BET_ID");
		const { cache = false } = options || {};

		if (cache) {
			const cached = this.cache.get(betId);
			if (cached) {
				return cached;
			}
		}

		const { response } = await this.client.api.request(
			Routes.guilds.bets.get(this.guildId, betId),
		);

		const bet = new GuildBet(response);
		this.cache.set(bet.betId, bet);
		return bet;
	}
}
