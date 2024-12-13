import { assertBet } from "@/assertions/bet";
import { assertString } from "@/assertions/literal";
import { Routes } from "@/lib/routes";
import { BetEntity } from "@/structures/bet/base";
import { AllBetsResult } from "@/structures/bet/getAll";
import { Collection } from "@/structures/collection";
import type {
	APIBetResult,
	RESTGetAPIBetsPaginationQuery,
} from "@quikcess/bet-api-types/v1";
import type { Betting } from "..";

export class BetModule {
	constructor(private readonly client: Betting) {}

	async getById(betId: string): Promise<BetEntity> {
		assertString(betId, "BET_ID");

		const { response } = await this.client.api.request(
			Routes.bets.getById(betId),
		);
		return new BetEntity(response);
	}

	async getByChannelId(channelId: string): Promise<BetEntity> {
		assertString(channelId, "CHANNEL_ID");

		const { response } = await this.client.api.request(
			Routes.bets.getByChannelId(channelId),
		);
		return new BetEntity(response);
	}

	async getAll(
		guildId?: string,
		options?: RESTGetAPIBetsPaginationQuery,
	): Promise<AllBetsResult> {
		if (guildId) assertString(guildId, "GUILD_ID");

		const { response } = await this.client.api.request(Routes.bets.getAll(), {
			query: options || {},
		});

		const transformedData = new Collection(
			response.data.map((data) => [data.bet_id, new BetEntity(data)]),
		);

		return new AllBetsResult({
			currentPage: response.current_page,
			totalPages: response.total_pages,
			totalBets: response.total_bets,
			data: transformedData,
		});
	}

	async create(data: APIBetResult): Promise<BetEntity> {
		assertBet(data, "/bets/create");

		const { response } = await this.client.api.request(Routes.bets.create(), {
			method: "POST",
			body: data,
		});

		return new BetEntity(response);
	}
}
